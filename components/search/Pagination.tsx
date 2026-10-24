import Link from "next/link";

function pageList(page: number, total: number): (number | "...") []{
    const set = new Set([1, total, page - 1, page, page +1]);
    const nums = [...set].filter((n) => n >=1 && n <=total).sort((a,b) => a-b);

    const out: (number | "...")[] = [];
    nums.forEach((n, i) => {
        if(i > 0 && n- nums[i -1] > 1) out.push("...");
        out.push(n);
    });
    return out;
}

export default function  Pagination({page, totalPages, hrefFor,}: 
    {page:number; totalPages: number; hrefFor: (p: number)=> string}){
if (totalPages <= 1) return null;

const base = "flex h-10 min-w-10 items-center justify-center rounded-lg border px-2 text-sm sm:h-9 sm: min-w-0 sm:rounded sm:border-transparent";
const idle = `${base} border-slate-300 text-slate-700 hover:bg-slate-100 hover:cursor-pointer`;
const active = `${base} border-slate-400 bg-slate-200 font-semibold text-slate-900`;
const off = `${base} border-slate-299 text-slate-300`;

return(
    <nav aria-label="Pagination"
    className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-1">
        {page >1 ? (
            <Link href={hrefFor(page -1)}
            aria-label="Previous page"
            className={idle}>⟵</Link>

        ): (<span className={off} aria-hidden>⟵</span>)}
        {pageList(page, totalPages).map((p, i) =>
        p === "..." ? (
            <span key={`gap-${i}`} className={off}>...</span>
        ): (
            <Link key={p} href={hrefFor(p)} aria-current={p === page ? "page": undefined } className={p === page ? active : idle}>{p}
            </Link>
        )
        )}

        {page < totalPages ? (
            <Link href={hrefFor(page +1)} aria-label="Next page"
            className={idle}>⟵</Link>
        ): (
            <span className={off} aria-hidden>⟵</span>
        )}

    </nav>
)
}