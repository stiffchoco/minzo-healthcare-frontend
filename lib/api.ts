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
  image?: string;
};

export type FacilitiesResult = { facilities: Facility[]; error: boolean };

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
  const areaParts = [pick(raw, ["area", "neighborhood", "neighbourhood", "address"]), pick(raw, ["city", "county"])].filter(
    (v): v is string => typeof v === "string" && v.length > 0
  );

  return {
    id: String(pick(raw, ["id", "_id", "businessId"]) ?? ""),
    name: String(pick(raw, ["name", "businessName"]) ?? "Unnamed facility"),
    category: String(pick(raw, ["category", "type", "businessType"]) ?? "Facility"),
    area: areaParts.join(", "),
    rating: toNumber(pick(raw, ["averageRating", "rating", "avgRating"])),
    reviewCount: toNumber(pick(raw, ["reviewCount", "reviewsCount", "totalReviews"])),
    distanceKm: toNumber(pick(raw, ["distanceKm", "distance"])),
    verified: Boolean(pick(raw, ["isVerified", "verified"])),
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

// GET /businesses/top-rated  (called on the server, cached for 60s)
export const getTopRated = (limit = 6) =>
  fetchFacilities("/business/top-rated", { limit }, { next: { revalidate: 60 } });

// GET /businesses/nearby  (called from the browser after the user shares location)
export const getNearby = (lat: number, lng: number, limit = 6) =>
  fetchFacilities("/business/nearby", { lat, lng, limit }, { cache: "no-store" });