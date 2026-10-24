"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Crosshair, MapPin} from "lucide-react";
import FacilityCard from "@/components/home/facilitycard";
import {getNearby, type Facility} from '@/lib/api';


type Status = "idle" | "locating" | "loading" | "done" | "denied" | "error" ; 

export default function NearbyFacilities(){
    const router = useRouter();
    const [status, setStatus] = useState<Status>("idle");
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [coords, setCoords] = useState<{lat:number; lng: number} | null>(null);
    const [place, setPlace] = useState("Monrovia, Liberia");

    function locate(){
        if(!("geolocation" in navigator)){
            setStatus("denied");
            return;
        }
        setStatus("locating");
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const c = {
                    lat: pos.coords.latitude, lng:pos.coords.longitude
                };
                setCoords(c);
                setStatus("loading");
                const result = await getNearby(c.lat, c.lng, 4);
                setFacilities(result.facilities);
                setStatus(result.error ? "error": "done");
            
            },()=> setStatus("denied"),
            {timeout:10000}
        );
    }

    function explore(){
        if(status === "denied"){
            router.push(`/search?location=$(encodeURIComponent(place.trim())}`);
            return;

        }
        locate();
    }

    const busy =status === "locating" || status ==="loading";
    const label = status === "locating" ? "Getting your location...": status === "loading" ? "Finding facilities...": "Use current location";

    return (
        <section id="nearby" className="mx-auto max-w-7xl scroll-mt-20 
        px-4 pt-6 sm:px-6 md:pt-8">
            <button type="button"
            onClick={locate}
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0b4468]
            bg-white py-3 text-sm font-semibold text-[#0b4468] transition-colors hover:bg-sky-50 disabled:opacity-60 md:hidden"
            >
                <MapPin size={16} aria-hidden/>{label}

            </button>

            <div className="hidden items-center justify-between
             gap-6 rounded-xl bg-gradient-to-r from-[#1675bb] from-30% to-slate-200 to-70% px-5 py-5 shadow-md md:flex">
                <div className="text-xs font-semibold text-white">
                    <p>find services near you</p>
                    <p className="mt-0.5">discover top rated facilities and local businessed in your area</p>
                </div>
                <div className="flex items-center gap-3">
                    <label htmlFor="" className="flex w-48 items-center gap-2 rounded-full border border-[#0b4468] bg-white
                    px-3 py-1.5">
                        <Crosshair size={14} className="shrink-0 text-[#0b4468]"/>
                        <span className="sr-only">Place</span>
                        <input value={place} onChange={(e) => setPlace(e.target.value)} className="w-full bg-transparent text-[11px]
                        text-[#0b468] outline-none" />

                    </label>

                    <button type="button"
                    onClick={explore}
                    disabled={busy}
                    className="rounded-full bg-[#0b4468] px-5 py-2 text-[11px] font-semibold
                    text-white transition-colors hover:bg-[#093652] disabled: opacity-60"
                    >
                        {busy ? "Finding...": "Explore nearby"}

                    </button>
                </div>
             </div>

             <div aria-live="polite">
                {status === "denied" && (
                    <p className="mt-3 text-center text-sm text-slate-600">
                        Location access is blocked. Allow it in your browser, or{""}
                        <Link href="/search" className="font-semibold text-[#0b4468] underline">
                        search by County
                        </Link>
                        .
                    </p>
                )}
                {status === "error" && (
                    <p className="mt-3 text-center text-sm text-slate-600">
                        We couldn&apos;t load nearby facilities right now. Please try again.
                    </p>
                )}
                {status === "done" && facilities.length === 0 && (
                    <p className="mt-3 text-center text-sm text-slate-600">No facilities found near you yet</p>
                )}
             </div>

             {status === "done" && facilities.length > 0 &&(
                <div className="mt-6">
                    <div className="flex items-end justify-between">
                        <h2 className="text-xl font-bold text-slate-900 md:text-sm">Facilities near you</h2>
                        {coords && (
                            <Link href={`/search?nearby=true&lat=${coords.lat}&lng=${coords.lng}`}
                            className="text-xs font-semibold text-[#0b4468] hover:underline md:text-[11px] md:font-normal md:text-slate-600">
                        See all nearby
                            </Link>
                        )}
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
                        {facilities.map((f, i) =>(
                            <FacilityCard key={f.id || i } facility={f} />
                        ))}
                    </div>
                </div>
             )}
        </section>
    )
}

