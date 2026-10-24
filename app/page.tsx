import Hero from "@/components/home/hero";
import CategoryGrid from "@/components/home/categorygrid";
import TopRatedFacilities from "@/components/home/Topratedfacilities";
import HowItWorks from "@/components/home/howitworks"; 
import NearbyFacilities from "@/components/home/nearbyfacilities";
import CommunityCTA from "@/components/home/communitycta";


export default function HomePage(){
  return (
    <main className="min-h-screen bg-gray-50">
     
    <Hero />
    <CategoryGrid />
    <TopRatedFacilities />
    <NearbyFacilities />
    <HowItWorks />
    <CommunityCTA />
   

    </main>
  )
}