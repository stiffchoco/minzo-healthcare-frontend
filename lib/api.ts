// Single place that talks to the backend. If the API team changes a field name or
// route, this is the only file to touch.

export type Facility = {
  id: string;
  name: string;
  category: string;
  area: string;
  rating?: number;
  reviewCount?: number;
  distanceKm?: number;
  verified: boolean;
  claimable: boolean;
  services?: string[];
  image?: string;
};

export type FacilitiesResult = { facilities: Facility[]; error: boolean };

export type SearchParams = {
  q?: string;
  type?: string;
  location?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  rating?: number;
  sort?: string;
  page?: number;
  limit?: number;
};

export type SearchResult = {
  facilities: Facility[];
  total: number;
  exact: boolean; // false when the API didn't send a total
  page: number;
  totalPages: number;
  error: boolean;
};

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://minzo-mvp-backend.onrender.com/api/v1").replace(/\/$/, "");

type Raw = Record<string, unknown>;

const pick = (raw: Raw, keys: string[]) => {
  for (const k of keys) if (raw[k] !== undefined && raw[k] !== null) return raw[k];
  return undefined;
};

const toNumber = (v: unknown) => {
  if (v === undefined || v === "") return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

// Tolerant mapper: accepts the likely field names until the response shape is confirmed.
export function normalizeFacility(raw: Raw): Facility {
  const city = pick(raw, ["city", "town"]);
  const county = pick(raw, ["county"]);
  const places = [city, county].filter((v): v is string => typeof v === "string" && v.length > 0);
  const address = pick(raw, ["area", "neighborhood", "neighbourhood", "address"]);
  const area = places.length ? places.join(", ") : typeof address === "string" ? address : "";

  const rawServices = pick(raw, ["services", "serviceList", "specialties"]);
  const services = Array.isArray(rawServices)
    ? rawServices
        .map((s) => (typeof s === "string" ? s : String((s as Raw | null)?.name ?? "")))
        .filter(Boolean)
    : undefined;

  const verified = Boolean(pick(raw, ["isVerified", "verified"]));
  const hasOwner = Boolean(pick(raw, ["ownerId", "owner", "claimedBy", "isClaimed", "claimed"]));

  return {
    id: String(pick(raw, ["id", "_id", "businessId"]) ?? ""),
    name: String(pick(raw, ["name", "businessName"]) ?? "Unnamed facility"),
    category: String(pick(raw, ["category", "type", "businessType"]) ?? "Facility"),
    area,
    rating: toNumber(pick(raw, ["averageRating", "rating", "avgRating"])),
    reviewCount: toNumber(pick(raw, ["reviewCount", "reviewsCount", "totalReviews"])),
    distanceKm: toNumber(pick(raw, ["distanceKm", "distance"])),
    verified,
    claimable: !verified && !hasOwner,
    services,
    image: (() => {
      const v = pick(raw, ["imageUrl", "image", "photo", "coverImage", "coverPhoto"]);
      return typeof v === "string" && v ? v : undefined;
    })(),
  };
}

// Handles [...], { data: [...] }, { data: { businesses: [...] } }, { businesses: [...] }, etc.
function extractList(json: unknown): Raw[] {
  if (Array.isArray(json)) return json as Raw[];
  if (json && typeof json === "object") {
    const obj = json as Raw;
    for (const key of ["data", "businesses", "results", "items"]) {
      const value = obj[key];
      if (Array.isArray(value)) return value as Raw[];
      if (value && typeof value === "object") {
        const inner = extractList(value);
        if (inner.length) return inner;
      }
    }
  }
  return [];
}

// Finds pagination info wherever the API puts it.
function extractMeta(json: unknown): Raw {
  const find = (o: unknown): Raw | undefined => {
    if (!o || typeof o !== "object" || Array.isArray(o)) return undefined;
    const obj = o as Raw;
    for (const k of ["pagination", "meta", "paging"]) {
      if (obj[k] && typeof obj[k] === "object") return obj[k] as Raw;
    }
    return find(obj.data);
  };
  return find(json) ?? (json && typeof json === "object" && !Array.isArray(json) ? (json as Raw) : {});
}

async function fetchFacilities(
  path: string,
  params: Record<string, string | number>,
  init?: RequestInit
): Promise<FacilitiesResult> {
  const qs = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]));
  try {
    const res = await fetch(`${API_URL}${path}?${qs.toString()}`, init);
    if (!res.ok) throw new Error(`API ${res.status}`);
    const facilities = extractList(await res.json()).map(normalizeFacility);
    return { facilities, error: false };
  } catch {
    return { facilities: [], error: true };
  }
}

// GET /business/top-rated  (called on the server, cached for 60s)
export const getTopRated = (limit = 6) =>
  fetchFacilities("/business/top-rated", { limit }, { next: { revalidate: 60 } });

// GET /business/nearby  (called from the browser after the user shares location)
export const getNearby = (lat: number, lng: number, limit = 6) =>
  fetchFacilities("/business/nearby", { lat, lng, limit }, { cache: "no-store" });

// ---------- Search results page ----------
// ASSUMED query names: search, type, location, lat, lng, radius, minRating, sort, page, limit.
// If the backend names differ, change them here and nowhere else.
export async function searchFacilities(p: SearchParams): Promise<SearchResult> {
  const page = p.page ?? 1;
  const limit = p.limit ?? 8;
  const nearby = p.lat !== undefined && p.lng !== undefined;

  const qs = new URLSearchParams();
  const set = (k: string, v: unknown) => {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  };
  set("search", p.q);
  set("type", p.type);
  set("page", page);
  set("limit", limit);
  set("minRating", p.rating && p.rating > 0 ? p.rating : undefined);
  set("sort", p.sort && p.sort !== "match" ? p.sort : undefined);
  if (nearby) {
    set("lat", p.lat);
    set("lng", p.lng);
    set("radius", p.radius);
  } else {
    set("location", p.location);
  }

  const empty: SearchResult = { facilities: [], total: 0, exact: true, page, totalPages: 1, error: true };
  try {
    const res = await fetch(`${API_URL}${nearby ? "/business/nearby" : "/business/all"}?${qs.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    const facilities = extractList(json).map(normalizeFacility);

    const meta = extractMeta(json);
    const total = toNumber(pick(meta, ["total", "totalItems", "totalCount", "totalResults"]));
    const pages = toNumber(pick(meta, ["totalPages", "pages", "pageCount", "lastPage"]));
    const totalPages =
      pages ?? (total !== undefined ? Math.max(1, Math.ceil(total / limit)) : facilities.length >= limit ? page + 1 : page);

    return {
      facilities,
      total: total ?? (page - 1) * limit + facilities.length,
      exact: total !== undefined,
      page,
      totalPages,
      error: false,
    };
  } catch {
    return empty;
  }
}

// POST /business/:id/claim  (needs the logged-in user's session)
export async function claimFacility(id: string): Promise<{ ok: boolean; status: number; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/business/${encodeURIComponent(id)}/claim`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    let message: string | undefined;
    try {
      const j = (await res.json()) as Raw;
      const m = pick(j, ["message", "error"]);
      message = typeof m === "string" ? m : undefined;
    } catch {
      /* no body */
    }
    return { ok: res.ok, status: res.status, message };
  } catch {
    return { ok: false, status: 0 };
  }
}