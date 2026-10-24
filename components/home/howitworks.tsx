const steps =[
    {
        title: "Search",
        body: "Find facilities by name, category, service, or location",
        badge:"bg-[#0b4468]",
        shadow:"md:shadowm-[3px_4px_0_0_#0b4468]"
    },
        {
        title: "Compare",
        body: "Explore services, locations, and community reviews",
        badge:"bg-[#59a68]",
        shadow:"md:shadowm-[3px_4px_0_0_#0b4468]"
    },
        {
        title: "Choose",
        body: "View facility details and contact the care team you trust",
        badge:"bg-[#0b4468]",
        shadow:"md:shadowm-[3px_4px_0_0_#0b4468]"
    },
        {
        title: "Share your experience",
        body: "Leave a review to help others make informed choices",
        badge:"bg-[#0b4468]",
        shadow:"md:shadowm-[3px_4px_0_0_#0b4468]"
    },
];

export default function HowItWorks(){
    return(
        <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-8 sm:px-6
        md:pt-10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2e7d5b] md:hidden">
                Simple and transparent
            </p>
            <h2 className="text-xl font-bold text-slate900 md:text-base">
                <span className="md:hidden">
                    How it works</span>

            </h2>
            <p className="mt-1 text-sm text-slate-600 md:text-base md:text-slate-800">
                <span className="md:hidden">Finding the right healthcare is simple.</span>
                <h2 className="font-bold text-black">How It Works</h2>
                <span className="hidden md:inline">
                    Finding the Right Service Is Simple
                </span>
            </p>

            <ol className="mt-4 grid gap-3 sm:grid-cols-2 md:mt-6 md:gap-6 lg:grid-cols-4">
                {steps.map((s, i ) => (
                    <li key={s.title}
                    className={`grid grid-cols-[2rem_1fr] gap-x-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm
                        md:grid-cols-[3.5rem_1fr] md:gap-x-4 md:gap-y-3 md:rounded-2xl
                         md:border-slate-100 md:p-5 ${s.shadow}`}>
                            <span className={`row-span-2 flex-h-8 w-8 items-center justify-center rounded-full
                                text-sm font-bold text-white md:row-span-1 md:h-14 md:w-14 md:text-3xl md:font-semibold ${s.badge}`}
                                >
                                    {i + 1}
                            </span>
                            <h3 className="self-center text-sm font-bold text-slate-900 md:text-xl">
                                {s.title}
                            </h3>
                            <p className="mt-0 5 text-xs leading-relaxed text-slate-600
                            md:col-span-2 md:mt-0 md:text-sm md:font-medium md:text-slate-800">
                                {s.body}
                            </p>
                         </li>
                ))}
            </ol>
        </section>
    )
}