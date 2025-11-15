// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-sky-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-rose-400">
            The Wedding of
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-slate-800">
            Imaan <span className="text-rose-400">&amp;</span> Groom
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1.3fr] items-stretch">
          {/* Main card */}
          <section className="relative overflow-hidden rounded-3xl bg-white/80 shadow-md border border-rose-100/70 p-7 md:p-9 backdrop-blur">
            {/* Decorative “floral” corners using gradients */}
            <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-rose-100 opacity-60 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-emerald-100 opacity-70 blur-3xl" />

            <div className="relative space-y-6 text-slate-700">
              <p className="text-sm font-medium tracking-wide text-rose-400 uppercase">
                You are warmly invited
              </p>

              <p className="text-lg">
                Please join us as we celebrate the beginning of our next
                chapter together.
              </p>

              <div className="space-y-2 text-sm md:text-base">
                <p className="font-medium text-slate-900">Sunday, 12 July 2026</p>
                <p>Arrival from 2:00pm • Ceremony at 3:00pm</p>
                <p className="mt-3 font-medium text-slate-900">
                  VENUENAME
                </p>
                <p>Peterborough, United Kingdom</p>
              </div>

              <p className="pt-2 text-sm text-slate-500">
                Reception, dinner and dancing to follow.
              </p>

              <div className="pt-4">
                <Link
                  href="/rsvp"
                  className="inline-flex items-center justify-center rounded-full border border-rose-300 bg-rose-100/80 px-6 py-2.5 text-sm font-medium text-rose-900 shadow-sm transition hover:bg-rose-200"
                >
                  RSVP to Imaan &amp; Groom&apos;s wedding
                </Link>
              </div>
            </div>
          </section>

          {/* Side details card */}
          <aside className="rounded-3xl bg-white/80 shadow-sm border border-amber-100/70 px-6 py-7 backdrop-blur flex flex-col justify-between">
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400">
                Details
              </h2>
              <div>
                <p className="font-medium text-slate-900">Dress code</p>
                <p>Soft pastels &amp; garden party chic.</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Gifts</p>
                <p>
                  Your presence is the greatest gift. We kindly request no
                  boxed gifts.
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-900">RSVP</p>
                <p>
                  Please let us know if you&apos;ll be joining us by{" "}
                  <span className="font-semibold text-rose-500">1 May 2026</span>.
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-400 text-right">
              Imaan &amp; Groom • 12.07.26
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
