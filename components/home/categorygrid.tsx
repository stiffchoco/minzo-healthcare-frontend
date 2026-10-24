// import Link from "next/link";
// import {
//     Building2,
//     HeartPulse,
//     Pill,
//     FlaskConical,
//     Smile, 
//     Heart,
//     Stethoscope,
//     Eye,
//     Ellipsis,
//     type LucideIcon,
//     Hospital,
// } from "lucide-react";
// import { categories } from "@/lib/categories";

// const icons: Record<string, LucideIcon> = {
//     Hospital: Building2,
//     Clinic: HeartPulse,
//     Pharmacy: Pill,
//     Laboratory: FlaskConical,
//     "Dental Care": Smile,
//     Maternity: Heart,
//     Specialist: Stethoscope,
//     "Eye Care": Eye,
// }

// export default function CategoryGrid(){
//     const tiles = [
//         ...categories.map((c) => ({
//             key:c.value,
//             short:c.short,
//             label:c.label,
//             href: `/search?type=${encodeURIComponent(c.value)}`,
//             Icon: icons[c.value],
//             visibility: c.mobile && c.desktop ? "" : c.mobile ? "md:hidden" : "hidden md:block",

//         })),
//         {key: "more", short: "More", label:"more services", href:"/search", Icon:Ellipsis, visibility:""},
//     ];

//     return (
//         <section className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-8 sm:px-6" id="categories">
//             <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2e7d5b] md:hissen">
//                 Care that fits
//             </p>

//             <div className="flex items-end justify-between">
//                 <div>
//                     <h2 className="text-xl font-bold text-slate-900 md:text-base md:font-semibold md:text-slate-700">
//                         <span className="md:hidden">
//                             Browse by category
//                         </span>

//                     </h2>
//                          <p className="hidden text-xs text-slate-500 md:block">
//                             Find the right service, faster, explore our top categories
//                         </p>

//                 </div>
//                 <Link href="/search" className="text-xs font-semibold text-[#0b4468] hover:underline md:font-normal md:text-slate-600">
//                     <span className="md:hidden">
//                     View all
//                     </span>
//                     <span className="hidden md:inline">View all Categories</span>
//                 </Link>
//             </div>

//             <ul className="mt-4 grid grid-cols-4 gap-3 md:mt-5 md:gap-4 lg:grid-cols-8">
//                 {tiles.map(({key, short, label, href, Icon, visibility}) => (
//                     <li key={key} className={visibility}>
//                         <Link href={href}
//                         className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white
//                         p-1 text-[#0b4468] shadow-sm transition-shadow hover:shadow-md md:gap-2 md:rounded-2xl md:border-2 md:border-[#0b4468]
//                         md:shadow-none">
//                             <Icon strokeWidth={1.75} aria-hidden className="h-6 w-6 md:h-9 md:w-9 md:stoke-[1.5]"/>
//                             <span className="text-center text-[11-px] font-medium text-slate-800 md:text-xs md:font-bold md:text-[#0b4468]">
//                                 <span className="md:hidden">{short}</span>
//                                 <span className="hidden md:inline">{label}</span>
//                             </span>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </section>
//     )
// }


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
} from "lucide-react";
import { categories } from "@/lib/categories";

const BRAND_BLUE = "#0b4468";
const BRAND_GREEN = "#2e7d5b";

const icons: Record<string, LucideIcon> = {
  Hospital: Building2,
  Clinic: HeartPulse,
  Pharmacy: Pill,
  Laboratory: FlaskConical,
  "Dental Care": Smile,
  Maternity: Heart,
  Specialist: Stethoscope,
  "Eye Care": Eye,
};

export default function CategoryGrid() {
  const tiles = [
    ...categories.map((c) => ({
      key: c.value,
      short: c.short,
      label: c.label,
      href: `/search?type=${encodeURIComponent(c.value)}`,
      Icon: icons[c.value],
      visibility:
        c.mobile && c.desktop
          ? ""
          : c.mobile
            ? "md:hidden"
            : "hidden md:block",
    })),
    {
      key: "more",
      short: "More",
      label: "More services",
      href: "/search",
      Icon: Ellipsis,
      visibility: "",
    },
  ];

  return (
    <section
      id="categories"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-8 sm:px-6"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2e7d5b] md:hidden">
        Care that fits
      </p>

      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-base md:font-semibold md:text-slate-700">
            <span className="md:hidden">Browse by category</span>
          </h2>

          <p className="hidden text-xs text-slate-500 md:block">
            Find the right service, faster. Explore our top categories.
          </p>
        </div>

        <Link
          href="/search"
          className="text-xs font-semibold text-[#0b4468] transition-colors hover:text-[#2e7d5b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4468] focus-visible:ring-offset-2 md:font-normal md:text-slate-600"
        >
          <span className="md:hidden">View all</span>
          <span className="hidden md:inline">View all Categories</span>
        </Link>
      </div>

      <ul className="mt-4 grid grid-cols-4 gap-3 md:mt-5 md:gap-4 md:grid-cols-9">
        {tiles.map(({ key, short, label, href, Icon, visibility }) => (
          <li key={key} className={`min-w-0 ${visibility}`}>
            <Link
              href={href}
              aria-label={label}
              className="group flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white p-1 text-[#0b4468] shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#0b4468] hover:bg-[#0b4468] hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4468] focus-visible:ring-offset-2 active:translate-y-0 md:gap-2 md:rounded-2xl md:p-2"
            >
              <Icon
                strokeWidth={1.75}
                aria-hidden="true"
                className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 sm:h-6 sm:w-6 md:h-8 md:w-8"
              />

              <span className="w-full break-words text-center text-[10px] font-medium leading-tight text-slate-800 transition-colors duration-200 group-hover:text-white sm:text-[11px] md:text-xs md:font-bold">
                <span className="md:hidden">{short}</span>
                <span className="hidden md:inline">{label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
