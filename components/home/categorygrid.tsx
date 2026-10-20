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
    Hospital,
} from "lucide-react";
import { categories } from "@/lib/categories";

const icons: Record<string, LucideIcon> = {
    Hospital: Building2,
    Clinic: HeartPulse,
    Pharmacy: Pill,
    Laboratory: FlaskConical,
    "Dental Care": Smile,
    Maternity: Heart,
    Specialist: Stethoscope,
    "Eye Care": Eye,
}

export default function CategoryGrid(){
    const tiles = [
        ...categories.map((c) => ({
            key:c.value,
            short:c.short,
            label:c.label,
            href: `/search?type=${encodeURIComponent(c.value)}`,
            Icon: icons[c.value],
            visibility: c.mobile && c.desktop ? "" : c.mobile ? "md:hidden" : "hidden md:block",

        })),
        {key: "more", short: "More", label:"more services", href:"/search", Icon:Ellipsis, visibility:""},
    ];

    return (
        <section className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-8 sm:px-6" id="categories">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2e7d5b] md:hissen">
                Care that fits
            </p>

            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 md:text-base md:font-semibold md:text-slate-700">
                        <span className="md:hidden">
                            Browse by category
                        </span>

                    </h2>
                         <p className="hidden text-xs text-slate-500 md:block">
                            Find the right service, faster, explore our top categories
                        </p>

                </div>
                <Link href="/search" className="text-xs font-semibold text-[#0b4468] hover:underline md:font-normal md:text-slate-600">
                    <span className="md:hidden">
                    View all
                    </span>
                    <span className="hidden md:inline">View all Categories</span>
                </Link>
            </div>

            <ul className="mt-4 grid grid-cols-4 gap-3 md:mt-5 md:gap-4 lg:grid-cols-8">
                {tiles.map(({key, short, label, href, Icon, visibility}) => (
                    <li key={key} className={visibility}>
                        <Link href={href}
                        className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white
                        p-1 text-[#0b4468] shadow-sm transition-shadow hover:shadow-md md:gap-2 md:rounded-2xl md:border-2 md:border-[#0b4468]
                        md:shadow-none">
                            <Icon strokeWidth={1.75} aria-hidden className="h-6 w-6 md:h-9 md:w-9 md:stoke-[1.5]"/>
                            <span className="text-center text-[11-px] font-medium text-slate-800 md:text-xs md:font-bold md:text-[#0b4468]">
                                <span className="md:hidden">{short}</span>
                                <span className="hidden md:inline">{label}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}