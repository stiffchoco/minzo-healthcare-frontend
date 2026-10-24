"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LocateFixed, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { searchFacilities, type SearchResult } from "@/lib/api";
import { categories, counties } from "@/lib/categories";
import FilterSidebar from "@/components/search/FilterSidebar";
import FacilityListItem from "./FacilityListItem";
import Pagination from "./Pagination";

const PAGE_SIZE = 8;
const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 hover:border-[#0b4468]";

type Update = Record<string, string | null>;

function PillSelect({
  label, value, onChange, children, full,
}: { label: string; value: string; onChange: (v: string) => void; children: ReactNode; full?: boolean }) {
  return (
    <label className={`relative ${full ? "block w-full md:w-auto" : ""}`}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none border border-slate-300 bg-white pl-4 pr-9 text-sm text-slate-800 outline-none hover:border-[#0b4468] ${
          full ? "w-full rounded-xl py-3 md:w-auto md:rounded-full md:py-2" : "rounded-full py-2"
        }`}
      >
        {children}
      </select>
      <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
    </label>
  );
}

function SearchForm({
  q, location, nearby, onSubmit,
}: { q: string; location: string; nearby: boolean; onSubmit: (q: string, loc: string) => void }) {
  const [query, setQuery] = useState(q);
  const [loc, setLoc] = useState(nearby ? "near" : location);

  function submit(e: FormEvent) {
    e.preventDefault();
    onSubmit(query, loc);
  }

  const label = "mb-1 block text-sm font-semibold text-slate-900 md:sr-only";
  const box = "relative flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 md:rounded-full md:px-4";

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-300 bg-white p-4 shadow-sm md:flex md:items-center md:gap-2 md:rounded-3xl md:p-3"
    >
      <div className="md:flex-1">
        <label htmlFor="sr-q" className={label}>Search</label>
        <div className={box}>
          <Search size={16} className="shrink-0 text-slate-500" aria-hidden />
          <input
            id="sr-q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a hospital, clinic, pharmacy..."
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="mt-3 md:mt-0 md:flex-1">
        <label htmlFor="sr-loc" className={label}>Location</label>
        <div className={box}>
          <MapPin size={16} className="shrink-0 text-slate-500" aria-hidden />
          <select
            id="sr-loc"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="w-full appearance-none bg-transparent pr-6 text-sm outline-none"
          >
            <option value="">Anywhere in Liberia</option>
            <option value="near">Near me</option>
            {loc && loc !== "near" && !counties.includes(loc) && <option value={loc}>{loc}</option>}
            {counties.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={14} aria-hidden className="pointer-events-none absolute right-3 text-slate-500" />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-[#0b4468] py-3 text-sm font-semibold text-white hover:bg-[#093652] md:mt-0 md:w-auto md:rounded-full md:px-8 md:py-2.5"
      >
        Search
      </button>
    </form>
  );
}

function Skeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
      <div className="h-44 w-full rounded-xl bg-slate-200 sm:h-32 sm:w-44" />
      <div className="flex-1 space-y-3">
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="h-3 w-2/3 rounded bg-slate-200" />
        <div className="h-9 w-32 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default function SearchResults() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // ---- state read from the URL ----
  const q = sp.get("q") ?? "";
  const type = sp.get("type") ?? "";
  const location = sp.get("location") ?? "";
  const nearby = sp.get("nearby") === "true";
  const lat = Number(sp.get("lat"));
  const lng = Number(sp.get("lng"));
  const hasCoords = sp.has("lat") && sp.has("lng") && !Number.isNaN(lat) && !Number.isNaN(lng);
  const rating = Number(sp.get("rating")) || 0;
  const radius = Number(sp.get("radius")) || 0;
  const sort = sp.get("sort") ?? "match";
  const page = Math.max(1, Number(sp.get("page")) || 1);
  const query = sp.toString();
  const returnTo = query ? `${pathname}?${query}` : pathname;

  const [result, setResult] = useState<SearchResult | null>(null);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [geo, setGeo] = useState<"idle" | "locating" | "denied">("idle");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [retry, setRetry] = useState(0);

  const update = useCallback(
    (changes: Update, resetPage = true) => {
      const next = new URLSearchParams(sp.toString());
      Object.entries(changes).forEach(([k, v]) => (v === null || v === "" ? next.delete(k) : next.set(k, v)));
      if (resetPage) next.delete("page");
      const s = next.toString();
      router.push(s ? `${pathname}?${s}` : pathname);
    },
    [sp, router, pathname]
  );

  // ---- "near me": ask the browser for coordinates, then put them in the URL ----
  useEffect(() => {
    if (!nearby || hasCoords) return;
    if (!("geolocation" in navigator)) {
      setGeo("denied");
      return;
    }
    setGeo("locating");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setGeo("idle");
        const next = new URLSearchParams(window.location.search);
        next.set("lat", p.coords.latitude.toFixed(5));
        next.set("lng", p.coords.longitude.toFixed(5));
        router.replace(`${pathname}?${next.toString()}`);
      },
      () => setGeo("denied"),
      { timeout: 10000 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearby, hasCoords]);

  const waitingForLocation = nearby && !hasCoords && geo !== "denied";

  // ---- fetch whenever the URL changes ----
  useEffect(() => {
    if (waitingForLocation) return;
    let cancelled = false;
    setStatus("loading");
    searchFacilities({
      q,
      type,
      location: nearby ? undefined : location,
      lat: hasCoords ? lat : undefined,
      lng: hasCoords ? lng : undefined,
      radius: radius || undefined,
      rating,
      sort,
      page,
      limit: PAGE_SIZE,
    }).then((r) => {
      if (cancelled) return;
      setResult(r);
      setStatus(r.error ? "error" : "done");
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, waitingForLocation, retry]);

  // ---- handlers ----
  const onSearch = (text: string, loc: string) =>
    update({
      q: text.trim() || null,
      nearby: loc === "near" ? "true" : null,
      location: loc && loc !== "near" ? loc : null,
      ...(loc === "near" ? {} : { lat: null, lng: null, radius: null }),
    });

  const setRadius = (km: number) =>
    km > 0 && !hasCoords
      ? update({ radius: String(km), nearby: "true", location: null })
      : update({ radius: km > 0 ? String(km) : null });

  const applyLocation = (on: boolean) =>
    on
      ? update({ nearby: "true", location: null })
      : update({ nearby: null, lat: null, lng: null, radius: null });

  const clearAll = () => router.push(q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname);

  const hrefForPage = (p: number) => {
    const next = new URLSearchParams(sp.toString());
    if (p <= 1) next.delete("page");
    else next.set("page", String(p));
    const s = next.toString();
    return s ? `${pathname}?${s}` : pathname;
  };

  const where = nearby ? "your area" : location || "Liberia";
  const loading = status === "loading" || waitingForLocation;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <SearchForm key={`${q}|${location}|${nearby}`} q={q} location={location} nearby={nearby} onSubmit={onSearch} />

      {/* Filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className={`${pill} lg:hidden ${filtersOpen ? "bg-slate-200 font-semibold" : ""}`}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={14} aria-hidden /> Filters
        </button>

        <PillSelect label="Category" value={type} onChange={(v) => update({ type: v || null })}>
          <option value="">Category</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.short}</option>
          ))}
        </PillSelect>

        <PillSelect label="Rating" value={String(rating)} onChange={(v) => update({ rating: Number(v) ? v : null })}>
          <option value="0">Rating</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>{n}+ stars</option>
          ))}
        </PillSelect>

        <PillSelect label="Distance" value={String(radius)} onChange={(v) => setRadius(Number(v))}>
          <option value="0">Distance</option>
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>Within {n} km</option>
          ))}
        </PillSelect>

        <button
          type="button"
          onClick={() => applyLocation(true)}
          className={`${pill} ${nearby ? "border-[#0b4468] bg-sky-50 font-semibold text-[#0b4468]" : ""}`}
        >
          <LocateFixed size={14} aria-hidden /> Near me
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[17rem_1fr]">
        <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <FilterSidebar
            type={type}
            rating={rating}
            radius={radius}
            useLocation={nearby}
            onType={(v) => update({ type: v || null })}
            onRating={(v) => update({ rating: v ? String(v) : null })}
            onRadius={setRadius}
            onUseLocation={applyLocation}
            onClear={clearAll}
          />
        </div>

        <section aria-live="polite">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
              {loading || !result ? (
                "Searching…"
              ) : (
                <>
                  Showing {result.total}
                  {!result.exact && result.totalPages > page ? "+" : ""} result{result.total === 1 ? "" : "s"}
                  {q && <> for “{q}”</>} in {where}
                </>
              )}
            </h1>
            <PillSelect full label="Sort by" value={sort} onChange={(v) => update({ sort: v === "match" ? null : v })}>
              <option value="match">Sort by: Best Match</option>
              <option value="rating">Sort by: Rating</option>
              <option value="name">Sort by: Name</option>
              {(hasCoords || nearby) && <option value="distance">Sort by: Distance</option>}
            </PillSelect>
          </div>

          {nearby && geo === "locating" && <p className="mt-3 text-sm text-slate-600">Getting your location…</p>}
          {nearby && geo === "denied" && (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              Location access is blocked, so we can&apos;t sort by distance. Pick a county above or allow location in your browser.
            </p>
          )}

          <div className="mt-4 flex flex-col gap-4">
            {loading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}

            {!loading && status === "error" && (
              <div className="rounded-2xl border border-slate-300 bg-white p-6 text-center">
                <p className="font-semibold text-slate-900">We couldn&apos;t load facilities right now.</p>
                <p className="mt-1 text-sm text-slate-600">Check your connection and try again. The server can take a minute to wake up.</p>
                <button
                  type="button"
                  onClick={() => setRetry((n) => n + 1)}
                  className="mt-4 rounded-full bg-[#0b4468] px-6 py-2 text-sm font-semibold text-white hover:bg-[#093652]"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && status === "done" && result?.facilities.length === 0 && (
              <div className="rounded-2xl border border-slate-300 bg-white p-6 text-center">
                <p className="font-semibold text-slate-900">No facilities match your search.</p>
                <p className="mt-1 text-sm text-slate-600">Try a different name, another county, or fewer filters.</p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="rounded-full border border-[#0b4468] px-6 py-2 text-sm font-semibold text-[#0b4468]"
                  >
                    Clear all filters
                  </button>
                  <Link
                    href="/login?tab=signup&type=business"
                    className="rounded-full bg-[#0b4468] px-6 py-2 text-sm font-semibold text-white"
                  >
                    List your facility
                  </Link>
                </div>
              </div>
            )}

            {!loading && status === "done" &&
              result?.facilities.map((f, i) => <FacilityListItem key={f.id || i} facility={f} returnTo={returnTo} />)}
          </div>

          {!loading && status === "done" && result && (
            <Pagination page={page} totalPages={result.totalPages} hrefFor={hrefForPage} />
          )}
        </section>
      </div>
    </div>
  );
}