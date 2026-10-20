import Image from "next/image";
import Link from "next/link";


const footerLinks = [
    { href:"/about", label: "About" },
    { href: "/help", label: "Help"},
    { href:"/about#privacy", label: "Privacy"},
    { href: "/about#terms", label: "Terms"},

];


export default function Footer () {
 return (
    <footer className="border-t border-gray-200 bg-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:px-6 md:flex-row  md:justify-between">

<Link href="/" aria-label="Minzo Africa home">
     <Image 
     src="/images/minzo-logo.jpeg"
     alt="Minzo Africa"
     width={72}
     height={34}
     className="h-8-auto"
     />           
  
    </Link>
    <ul className="flex items-center gap-6 text-xs">
        {
            footerLinks.map(l) => (
                <li key= ></li>
            )
        }
    </ul>
 

        </div>

    </footer>
 );
}