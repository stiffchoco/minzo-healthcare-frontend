"use client"
import {FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, ChevronDown } from "lucide-react";


export default function SearchBar() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    function handleSearch(event: FormEvent <HTMLFormElement>) {
        event.preventDefault;
        const params = new URLSearchParams();

        if(query.trim()) params.set("q", query.trim());
        if(location.trim()) params.set("location", location.trim());

        router.push(`/search?$(params.toString())`);            
    }

    return(
        <form onSubmit={handleSearch}
        className="grid gap-3 rounded-2xl bg-white p-3 shadow-lg sm:grid-cols-[1ftr_1ftr_auto]">
        <span className="text-xs font-semibold uppercase trackking -wide text-gray-500">
            What are you looking for?
        </span>
        <input value={query}
        onChange={(event) =>
        setQuery(event.target.value)
        } 
        className="w-full bg-transparent  text-sm text-gray-900 outline-none" />
        <label className="flex flex-col gap-1 border-gray-200 px-3 py-2 sm:border-1" htmlFor="">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Location</span>
        </label>
        <input 
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="County or town in Liberia"
        className="w-full bg-transparent text-sm text-gray-900 outline-none"   
        />

        <button 
        type = "submit"
        className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
            Search
        </button>
            
        </form>
    );
}