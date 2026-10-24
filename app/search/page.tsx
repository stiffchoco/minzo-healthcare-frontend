import { Suspense } from "react";
import type { Metadata } from "next";
import SearchResults from "@/components/search/SearchResults";



// export const metadata: Metadata = { title: "Find facilities - Minzo Africa " };

    export default function SearchPage(){
        return(
            <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500">Loading...</div>}>
        {/* Rendered Search Results will appear here */}
        <SearchResults />
            </Suspense>
        )
    }

