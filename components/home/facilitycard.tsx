import Link from "next/link";
import {
    Building2,
    HeartPulse,
    Pill,
    FlaskConical,
    Smile, 
    Heart,
    Stethoscope,
    Eye,
    Ellipsis,
    type LucideIcon,
    Star,
    Hospital,
} from "lucide-react";
import { Facility } from "@/lib/api";


function iconFor(category: string): LucideIcon {
    const c = category.toLowerCase();
    if(c.includes("pharm")) return Pill;
    if(c.includes("lab")) return FlaskConical;
    if(c.includes("dental")) return Smile;
    if(c.includes("matern")) return Heart;
    if(c.includes("special")) return Stethoscope;
    if(c.includes("eye")) return Eye;
    if(c.includes("clinic")) return HeartPulse;
    return Building2;
}

export default function FacilityCard({facility }: {facility: Facility}) {
    const { id, name, category, area, rating, reviewCount, distanceKm, verified, image } = facility;
    const Icon = iconFor(category);

    return(
        <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:rounded-xl md:p-0 md:shadow-md">

        {image ? (
            <img src={image} alt="" 
            className="h-24 w-full rounded-xl object-cover md:h-32 md:rounded-none"/>
                ) : (
                    <div className="flex h-24 items-center justify-center rounded-xl bg-sky-100 text-[#0b4468] md:h-32 md:rounded-none">
                        <Icon size={32} strokeWidth={1.5} aria-hidden />
                    
                    </div>
                )}

                <div className="flex flex-1 flex-col md:p4 ">
                    <div className="mt-3 flex items-start jusitfy-between gap-2 md:mt-0">
                        <h3 className="text-sm font-bold text-slate-900 md:text-xs">{name}</h3>
                        {rating !== undefined && (
                            <span className="flex shrink-0 items-center 
                            gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 md:hidden">
                                <Star size= {12} aria-hidden/>{ rating.toFixed (1)}
                            </span>
                        )}

                    </div>

                    <p className="mt-1 text-xs text-slate-600 md:text-[11px]">
                        {category}
                        {area && `. ${area}`}
                    </p>
                    <p className="mt-0 5 text-xs text-slate-500 md:text-[11px] md:text-slate-600">
                        {rating !== undefined && <span className="hidden md:inline">* {rating.toFixed(1)}
                        </span>}
                        {reviewCount !== undefined && <span>({reviewCount} reviews)</span>}
                        {distanceKm !== undefined && <span> . {distanceKm.toFixed(1)} km</span>}
                    </p>
                    {verified && <p className="mt-0.5 hidden text-[11px] text-slate-600 md:block">✓  Verified</p>}

                    <Link href={`/facility/${id}`}
                    className="mt-3 block rounded-xl bg-[#0b4468] py-3 text-center
                     text-sm font-semibold text-white transition-colors hover:bg-[#093652] md:mt-4 md:rounded-lg md:text-xs md:lowercase"> View Profile</Link>
                </div>
        </article>
    )
}