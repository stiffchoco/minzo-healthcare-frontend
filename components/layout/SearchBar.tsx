"use client"
import {FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, ChevronDown } from "lucide-react";
import { categories, counties} from "@/lib/categories";

export default function SearchBar() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("nearMe");
    const [type, setType] = useState("");

    function handleSearch(event: FormEvent <HTMLFormElement>) {
        event.preventDefault();
        const params = new URLSearchParams();
        const loc = location.trim();

        if(query.trim()) params.set("q", query.trim());
       if(!loc || loc.toLowerCase() === "near me") params.set("nearby", "true");
       else params.set("location", loc);
       if(type) params.set("type", type);

        router.push(`/search?$(params.toString())`);            
    }

    const field = "relative flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 md:rounded-none md:border-0 md:py-0";

    return(
        <form onSubmit={handleSearch}
        className="grid gap-3 rounded-2xl bg-white p-3 shadow-lg sm:grid-cols-[1ftr_1ftr_auto]
        md:items-center md:gap-0 md:rounded-full md:py-2 md:pl-6 md:pr-2"
        >
            <label className={field}>
            <Search size={18} className="shrink-0 text-slate-500" aria-hidden />
        <span className="sr-only">Search for a hospital, clinic, pharmacy or specialist</span>
        <input value={query}
        onChange={(event) =>
        setQuery(event.target.value)
        } 
        placeholder="Search for a hospial, clinic, pharmacy, specialist..."
        className="w-full bg-transparent  text-sm text-gray-900 outline-none" />
        </label>

        <div className="grid grid-cols-2 gap-2 md:contents">
            <label className="{`${field} md:border-1 md:border-slate-200 md:px-4`}">
            <MapPin size={16} className="shrink-0 text-slate-500" aria-hidden />
            <span className="sr-only">Location</span>
            <input list="location-options"
             value={location}
             onChange={(e)=> setLocation(e.target.value)}
             placeholder="County or town in Liberia"
             className="w-full bg-transparent pr-4 text-sm text-slate-700 outline-none placholder:text-slate-500" 
             />
             <datalist id="location-options">
                <option value="Near me" />
                {counties.map((c)=> (
                    <option value={c} key={c} />

                ))}
             </datalist>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 text-slate-500 md:hidden" aria-hidden />          
            </label>
            <label className="{`${field} md:border-1 md:border-slate-200 md:px-4`}">
                <span className="sr-only">Category</span>
                <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full appearance-none bg-transparent pr-5 text-sm text-slate-700 outline-none" id="">
                    <option value="">All categories</option>
                    {categories.map((c) => (
                        <option value={c.value} key={c.value}>
                            {c.short}
                        </option>
                    ))}

                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 text-slate-500" aria-hidden/>
            </label>
        </div>

        <button type="submit"
        className="rounded-xl bg-[#0b4468] px-6 py-3.5 text-sm font-semibold text-white trasition-colors hover:bg-[#09362]
        md:ml-2 md:rounded-full md:px-10 md:py-3">
            <span className="md-hidden">Search providers</span>
            <span className="hidden md:hidden">Search</span>

        </button>
     
     
            
        </form>
    );
}