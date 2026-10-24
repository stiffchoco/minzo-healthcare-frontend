import SearchBar from "../layout/SearchBar";

export default function Hero(){
    return(
        <section className="md:px-6 md:pt-8">
            <div className="mx-auto bg-[#0b4468] px-4 py-10 text-white md:relative
             md:max-w-7xl md:overflow-hidden
            md:rounded-3xl md:px-10 md:py-9">
                <div className="absolute inset-0  bg-[url('/images/hero.jpg')]
                bg-cover bg-center md:block " 
                aria-hidden/>
                <div aria-hidden className="absolute inset-0  bg-[#0b4468]/55 md:block" />
                <div className="relative mx-auto max-w-6xl">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-200 md:hidden
                    "> Healthcare directory in Liberia</p>
                    <h1 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl md:mt-0 md:max-w-none
                    md:text-4xl lg:text-5xl">Find Trusted Healthcare Providers in Liberia
                    </h1>

                    <p className="mt-3 max-w-xl text-sm text-sky-100 md:hidden">
                        Search verified facilities, compare services and make confident choices for your care.
                    </p>
                    <div className="mt-2 hidden md:block">
                        <p className="text-lg font-semibold">
                            Search for hospitals, clinics, pharmacies and more.
                        </p>
                        <p className="mt-5 text-log font-semibold">
                            Read reviews. Make informed decisions.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-8 md:max-w-5xl">
                        <SearchBar/>
                    </div>
                    <div className="mt-4 hidden justify-center gap-2 md:flex" aria-hidden>
                        <span className="h-3 w-3 rounded-full border-2 border-white bg-white"/>
                        <span className="h-3 w-3 rounded-full border-2 border-white bg-white"/>
                        <span className="h-3 w-3 rounded-full border-2 border-white bg-white"/>
                    </div>

                </div>
            </div>
        </section>
    )
}