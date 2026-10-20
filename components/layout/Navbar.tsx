"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import {useState } from "react"
import { Menu, X } from "lucide-react"


const navLinks = [
    {href: "/#categories", label: "Browse Category"},
    {href: "/#top-rated", label: "Top Rated Facilities" },
    {href: "/#how-it-works", label: "How Minzo works"},
    {href: "/reviews", label: "Reviews"},

];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive =(href: string) => 
         href ==="/#categories" ? pathname === "/" : pathname.startsWith(href); 
    
            return (
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
                
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                {/*Logo*/}
                <Link href="/" className="flex shrink-0 items-center" 
                aria-label="Minzo Africa home">
                    <Image src="/images/minzo.logo.jfif"
                    alt="Minzo Africa"
                    width={96}
                    height={44}
                    priority
                    className="h-11 w-auto" />
                </Link>

                <ul className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((l) => (
                        <li key={l.label}>
    
            <Link
    href={l.href}
    className={`relative block py-5 text-sm font-medium text-gray-900 transition-colors
    hover:text-[#0b4468] ${
        isActive(l.href)
            ? "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:bg-[#5b9a68]"
            : ""
    }`}
>
    {l.label}
</Link>

                        </li>
                    )) }
                </ul>
            

             <div className="hidden items-center gap-6 lg:flex">
                
                <Link href="/about" className="text-sm font-bold text-gray-900 hover:text-[#0b4468]">
                 About
                </Link>

                <Link href="/login" className="text-sm font-semibold text-gray-900 hover:text-[#0b4468]">
                Login 
                </Link>

                <Link href="/login?tab=signup"
                className="rounded-full bg-[#0b4468] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover: bg-[#093652]">
                    Sign up 
                </Link> 

             </div>

b               <button
                type="button"
                className="rounded-md p-2 text-gray-900 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                >
                    {open ? <X size={24} />: <Menu size={24} />}
        
</button>
             

            {/* <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-gray-900"> 
            <span aria-hidden>+</span> Minzo Africa
            </Link> */}

                {/* <div className="hidden items-center gap-6 md:flex">
                    {links.map((l) =>(
                        <Link
                        key ={l.label}
                        href={l.href}
                        className={`pb-1 text-sm font-medium hover:text-black ${
                            isActive(l.href) ? "border-b-2 border-black text-black" : "text-gray-600"
                        }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                    </div> */}

</nav>
                 
            
            {open && (
                <div className="border-t border-gray-200 bg-white px-4 pb-4 lg:hidden">
                    {[...navLinks, {href: "/about", label:"About"}].map((l) => (
                        <Link key={l.label}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 text-sm font-medium text-gray-800"
                        >
                            {l.label}
                        </Link>
                    ))}
                    <div className="mt-2 flex gap-2">
                        <Link href="/login"
                        onClick={() => setOpen(false)}
                        className="flex-1 rounded-full border border-[#0b4468]
                        py-2.5 text-center text-sm font-semibold text-[#0b4468]">
                            Login
                        </Link>
                        <Link 
                        href="/login?tab=signup"
                        onClick={() =>setOpen(false)}
                         className="flex-1 rounded-full bg-[#0b4468] py-2.5 text-center text-sm font-semibold text-white">
                            Sign up
                         </Link>
                    </div>

                </div>
            
               
            )}
         </header>
    )};

