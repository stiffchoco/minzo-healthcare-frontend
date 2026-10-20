import Link from "next/link";
import FacilityCard from "./facilitycard";
import { getTopRated } from "@/lib/api";

export default async function TopRatedFacilities(){
    const {facilities, error} = await getTopRated(4);

    return (
        <section id="top-rated" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-8 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2e7d5b] md:hidden">Community trusted</p>
            <div className="flex items-end justify-between">
                <h2 className="text-xl font-bold text-slate-900 md:text-sm">
                    <span className="md:hidden">
                        Top-rated facilities</span>

                </h2>
                <Link href="/search?sort=rating" className="text-xs font-semibold
                 text-[#0b468] hover:underline md:text-[11px] md:font-normal md:text-slate-600">
                    <span className="md:hidden">See all</span>
                    <span className="hidden md:inline">View all</span>
                 </Link>
            </div>

            {error ? (
                <p className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    We couldn&apos;t load top-rated facilities right now. Please try again shortly.
                </p>

            ): facilities.length=== 0 ? (
                <p className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    No facilities have been listed yet.
                </p>
            ): (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
                    {facilities.map((f, i ) =>(
                        <div key={f.id || i} className={i>=2? "hidden sm:block": ""}>
                        <FacilityCard facility={f} />
                        
                        </div>

                    ))}
                </div>
            )}
        </section>
    )

}