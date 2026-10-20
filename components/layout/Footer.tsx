import Image from "next/image";
import Link from "next/link";

const mobileLinks = [
  { href: "/login", label: "Log in" },
  { href: "/login?tab=signup", label: "Create account" },
  { href: "/login?tab=signup&type=business", label: "List a facility" },
];

const desktopLinks = [
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
  { href: "/about#privacy", label: "Privacy" },
  { href: "/about#terms", label: "Terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-4 border-t border-slate-200 bg-white md:bg-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6 md:flex-row md:justify-between md:py-6">
        {/* Brand */}
        <div className="md:hidden">
          <p className="text-sm font-bold text-slate-900">Minzo Africa</p>
          <p className="mt-1 text-xs text-slate-600">Trusted Healthcare. Stronger Communities.</p>
        </div>
        <Link href="/" aria-label="Minzo Africa home" className="hidden md:block">
          <Image src="/images/logo.jpg" alt="Minzo Africa" width={64} height={43} className="h-10 w-auto" />
        </Link>

        {/* Links */}
        <ul className="flex flex-wrap justify-center gap-5 text-xs text-[#0b4468] md:hidden">
          {mobileLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="hidden gap-6 text-xs text-[#0b4468] md:flex">
          {desktopLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="hidden text-xs text-slate-500 md:block">© {year} Minzo Africa · Liberia</p>
      </div>

      <p className="mx-auto max-w-3xl px-4 pb-6 text-center text-[11px] leading-relaxed text-slate-500">
        A directory listing does not guarantee the quality or availability of a healthcare service. Reviews are
        moderated but not independently verified.
        <span className="md:hidden"> © {year} Minzo Africa · Liberia</span>
      </p>
    </footer>
  );
}