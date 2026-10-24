import Link from "next/link";

export default function CommunityCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-8">
      <div className="relative isolate overflow-hidden rounded-2xl bg-[#0b4468] px-5 py-6 text-center text-white md:min-h-[260px] md:rounded-3xl md:p-8 md:text-left md:shadow-lg">
        {/* Background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 hidden bg-[url('/images/cta-bg.jpg')] bg-cover bg-center blur-[3px] md:block"
        />

        {/* Overlay for text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-[#0b4468]/80 md:block"
        />

        <div className="relative flex flex-col gap-6 md:min-h-[196px] md:justify-between">
          <div>
            <h2 className="mx-auto max-w-md text-xl font-bold leading-snug sm:text-2xl md:mx-0 md:max-w-2xl md:text-3xl">
              Help Your Community Make Better Choices
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-sky-100 md:mx-0 md:mt-3 md:max-w-xl md:text-base md:text-white">
              Your experience can help someone else find the right service.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-end">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0b4468] shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b4468]"
            >
              Find a Facility
            </Link>

            <Link
              href="/reviews"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b4468]"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}