"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { claimFacility, type Facility } from "@/lib/api";
import { facilityImage } from "@/lib/facilityImages";

type ClaimState = "idle" | "loading" | "done" | "error";

const KEY = "minzo:saved";

const readSaved = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
};

// Shared button look: outlined full-width on mobile, compact pill on desktop
const btn =
  "w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50 sm:w-auto sm:rounded-full sm:py-2";

export default function FacilityListItem({ facility, returnTo }: { facility: Facility; returnTo: string }) {
  const router = useRouter();
  const [claim, setClaim] = useState<ClaimState>("idle");
  const [msg, setMsg] = useState("");
  const [saved, setSaved] = useState(false);

  const { id, name, category, area, rating, reviewCount, distanceKm, verified, claimable, services, image } = facility;
  const src = facilityImage(category, id || name, image);
  const rated = rating !== undefined && rating > 0;

  useEffect(() => {
    setSaved(readSaved().includes(id));
  }, [id]);

  function toggleSave() {
    const list = readSaved();
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(next.includes(id));
  }

  async function handleClaim() {
    setClaim("loading");
    setMsg("");
    const r = await claimFacility(id);
    if (r.status === 401) {
      // not logged in: go to login, then come back to this page
      router.push(`/login?redirect=${encodeURIComponent(returnTo)}`);
      return;
    }
    if (r.ok) {
      setClaim("done");
      setMsg(r.message ?? "Claim submitted. An admin will review it.");
    } else {
      setClaim("error");
      setMsg(r.message ?? "We couldn't submit your claim. Please try again.");
    }
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-300 bg-white p-4 shadow-sm sm:flex-row">
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-xl bg-slate-200 sm:h-32 sm:w-44">
        <Image src={src} alt={`${name} photo`} fill sizes="(min-width: 640px) 176px, 100vw" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-slate-900 sm:text-base">{name}</h2>
        <p className="mt-0.5 text-sm text-slate-600">
          {category}
          {area && ` · ${area}`}
        </p>

        <p className="mt-1 text-sm text-slate-700 sm:mt-0.5">
          {rated ? (
            <>
              ★ {rating.toFixed(1)}
              {reviewCount !== undefined && ` (${reviewCount} reviews)`}
            </>
          ) : (
            "No reviews yet"
          )}
          {distanceKm !== undefined && ` · ${distanceKm.toFixed(1)} km`}
        </p>

        <p className={`mt-1 text-sm sm:mt-0.5 ${verified ? "text-slate-900 sm:text-emerald-600" : "text-amber-700"}`}>
          {verified ? "✓ Verified" : "Unverified listing"}
        </p>

        {services && services.length > 0 && (
          <p className="mt-1 text-sm text-slate-700 sm:mt-0.5 sm:truncate">{services.slice(0, 3).join(" · ")}</p>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:mt-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href={`/facility/${id}`}
            className={`${btn} sm:border-[#0b4468] sm:bg-[#0b4468] sm:text-white sm:hover:bg-[#093652]`}
          >
            View Profile
          </Link>

          <Link href={`/facility/${id}#contact`} className={`${btn} sm:hidden`}>
            Contact
          </Link>

          <button
            type="button"
            onClick={toggleSave}
            aria-pressed={saved}
            className={`${btn} sm:border-[#0b4468] sm:text-[#0b4468]`}
          >
            <span className="sm:hidden">{saved ? "♥ Saved" : "♡ Save facility"}</span>
            <span className="hidden sm:inline">{saved ? "★ Following" : "☆ Follow"}</span>
          </button>

          {claimable && claim !== "done" && (
            <button
              type="button"
              onClick={handleClaim}
              disabled={claim === "loading"}
              className={`${btn} border-dashed disabled:opacity-60`}
            >
              {claim === "loading" ? "Submitting…" : "Claim this facility"}
            </button>
          )}
        </div>

        {msg && (
          <p role="status" className={`mt-2 text-sm ${claim === "done" ? "text-emerald-700" : "text-red-600"}`}>
            {msg}
          </p>
        )}
      </div>
    </article>
  );
}