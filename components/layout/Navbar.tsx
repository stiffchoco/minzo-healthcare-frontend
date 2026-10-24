// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// const navLinks = [
//   { href: "/#categories", label: "Browse Category" },
//   { href: "/#top-rated", label: "Top-rated Facilities" },
//   { href: "/#how-it-works", label: "How Minzo works" },
//   { href: "/reviews", label: "Reviews" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   // On the homepage, "Browse Category" carries the green underline (as in the design).
//   const isActive = (href: string) => (href === "/#categories" ? pathname === "/" : pathname.startsWith(href));

//   return (
//     <header className="sticky top-0 z-50 border-b border-slate-200 bg-white lg:border-0 lg:shadow-md">
//       <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
//         <Link href="/" aria-label="Minzo Africa home" className="flex items-center">
//           {/* Mobile / tablet mark */}
//           <span className="flex items-center gap-2.5 lg:hidden">
//             <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b4468] text-base font-bold text-white">
//               M
//             </span>
//             <span className="leading-tight">
//               <span className="block text-sm font-bold text-slate-900">Minzo Africa</span>
//               <span className="block text-[11px] text-slate-500">Healthcare for community</span>
//             </span>
//           </span>
//           {/* Desktop logo */}
//           <Image
//             src="/images/logo.jpg"
//             alt="Minzo Africa"
//             width={96}
//             height={65}
//             priority
//             className="hidden h-12 w-auto lg:block"
//           />
//         </Link>

//         {/* Desktop links */}
//         <ul className="hidden items-center gap-8 lg:flex">
//           {navLinks.map((l) => (
//             <li key={l.label}>
//               <Link
//                 href={l.href}
//                 className={`relative block py-5 text-sm font-medium text-slate-900 transition-colors hover:text-[#0b4468] ${
//                   isActive(l.href)
//                     ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:bg-[#5b9a68]"
//                     : ""
//                 }`}
//               >
//                 {l.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className="hidden items-center gap-6 lg:flex">
//           <Link href="/about" className="text-sm font-bold text-slate-900 hover:text-[#0b4468]">
//             About
//           </Link>
//           <Link href="/login" className="text-sm font-semibold text-slate-900 hover:text-[#0b4468]">
//             Login
//           </Link>
//           <Link
//             href="/login?tab=signup"
//             className="rounded-full bg-[#0b4468] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#093652]"
//           >
//             Sign up
//           </Link>
//         </div>

//         {/* Mobile toggle */}
//         <button
//           type="button"
//           className="rounded-lg border border-slate-200 p-2 text-slate-800 lg:hidden"
//           aria-label="Toggle menu"
//           aria-expanded={open}
//           onClick={() => setOpen((v) => !v)}
//         >
//           {open ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </nav>

//       {open && (
//         <div className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
//           {[...navLinks, { href: "/about", label: "About" }].map((l) => (
//             <Link
//               key={l.label}
//               href={l.href}
//               onClick={() => setOpen(false)}
//               className="block py-3 text-sm font-medium text-slate-800"
//             >
//               {l.label}
//             </Link>
//           ))}
//           <div className="mt-2 flex gap-2">
//             <Link
//               href="/login"
//               onClick={() => setOpen(false)}
//               className="flex-1 rounded-full border border-[#0b4468] py-2.5 text-center text-sm font-semibold text-[#0b4468]"
//             >
//               Login
//             </Link>
//             <Link
//               href="/login?tab=signup"
//               onClick={() => setOpen(false)}
//               className="flex-1 rounded-full bg-[#0b4468] py-2.5 text-center text-sm font-semibold text-white"
//             >
//               Sign up
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#categories", label: "Browse Category" },
  { href: "/#top-rated", label: "Top-rated Facilities" },
  { href: "/#how-it-works", label: "How Minzo works" },
  { href: "/reviews", label: "Reviews" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // On the homepage, "Browse Category" carries the green underline (as in the design).
  const isActive = (href: string) => (href === "/#categories" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white lg:border-0 lg:shadow-md ">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Minzo Africa home" className="flex items-center">
          {/* Mobile / tablet mark */}
          <span className="flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b4468] text-base font-bold text-white">
              M
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-slate-900">Minzo Africa</span>
              <span className="block text-[11px] text-slate-500">Healthcare for community</span>
            </span>
          </span>
          {/* Desktop logo */}
          <Image
            src="/images/logo.jpg"
            alt="Minzo Africa"
            width={96}
            height={65}
            priority
            className="hidden h-12 w-auto lg:block"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={`relative block py-5 text-sm font-medium text-slate-900 transition-colors hover:text-[#0b4468] ${
                  isActive(l.href)
                    ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:bg-[#5b9a68]"
                    : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/about" className="text-sm font-bold text-slate-900 hover:text-[#0b4468]">
            About
          </Link>
          <Link href="/login" className="text-sm font-semibold text-slate-900 hover:text-[#0b4468]">
            Login
          </Link>
          <Link
            href="/login?tab=signup"
            className="rounded-full bg-[#0b4468] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#093652]"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 text-slate-800 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          {[...navLinks, { href: "/about", label: "About" }].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-slate-800"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-[#0b4468] py-2.5 text-center text-sm font-semibold text-[#0b4468]"
            >
              Login
            </Link>
            <Link
              href="/login?tab=signup"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-[#0b4468] py-2.5 text-center text-sm font-semibold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}