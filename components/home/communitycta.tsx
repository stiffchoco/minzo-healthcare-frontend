import Link from "next/link";


export default function CommunityCTA(){
    return (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
            <div className="bg-[#0b4468] px-5 py-8 text-center text-white md:relative
            md:flex md:min-h-[260px] md:flex-col md:justify-between md:overflow-hidden md:rounded-3xl md:p-8 md:text-left md:shadow-lg">
                <div aria-hidden className="absolute inset-0 hidden bg-[url('/images/cta-bg.jpg')]
                bg-cover bg-center blur-[3px] md:block" />
                <div className="absolute inset-0 hidden bg-slate-300/50 md:block" />
                <div className="relative">
                    <h2 className="mx-auto max-w-md text-xl font-bold leading-snug sm:text-2xl md:mx-0 md:max-w-none md:text-3xl">
                        Help Your Community Make Better Choices
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-sky-100 md:mx-0 md:mt-3 md:text-xl md:text-white">
                        Your experience can help someone else find the right service.
                    </p>
                    <div className="relative mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-8 md:justify-end
                    ">
                        <Link href="/search"
                        className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-[#0b4668] hover ">
                        </Link>
                    </div>
                </div>
                
            </div>
        </section>
    )
}