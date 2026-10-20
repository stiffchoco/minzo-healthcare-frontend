// import Link from "next/Link";
import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/layout/SearchBar"
import Hero from "@/components/home/hero";
import Footer from "@/components/layout/Footer"
import CategoryGrid from "@/components/home/categorygrid";
import FacilityCard from "@/components/home/facilitycard";



export default function HomePage(){
  return (
    <main className="min-h-screen bg-gray-50">
     
    <Hero />
    <CategoryGrid />
    {/* <FacilityCard /> */}

    <Footer />
    {/* <section className="bg-blue-950 px-5 py-20 text-white  sm:py-28">

    </section> */}
    </main>
  )
}