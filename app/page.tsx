// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-sky-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full">
        {/* Heading */}
        <div className="mb-8 text-center space-y-3">
          <p className="text-xs tracking-[0.3em] uppercase text-rose-400">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
          <h1 className="mt-1 text-4xl md:text-5xl font-semibold text-slate-800">
            Imaan <span className="text-rose-400">&amp;</span> Groom
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1.3fr] items-stretch">
          {/* Main invite card */}
          <section className="relative overflow-hidden rounded-3xl bg-white/80 shadow-md border border-rose-100/70 p-7 md:p-9 backdrop-blur">
            {/* Decorative “floral” blobs */}
            <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-rose-100 opacity-60 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-emerald-100 opacity-70 blur-3xl" />

            <div className="relative space-y-6 text-slate-700">
              <p className="text-sm font-medium tracking-wide text-rose-400 uppercase">
                Nikah &amp; Wedding Reception
              </p>

              <p className="text-lg">
                With the blessings of Allah ﷻ and their families, Imaan &amp; Groom
                warmly invite you to join them in celebrating their Nikah
                ceremony followed by a wedding reception.
              </p>

              {/* Qur'an ayah */}
              <div className="border-l-2 border-rose-100 pl-4 italic text-sm text-slate-600">
                “He created for you spouses from among yourselves so that you may
                find peace and comfort in each other…”
                <br />
                <span className="not-italic text-xs text-slate-500">
                  (Ar-Rum 30:21)
                </span>
              </div>

              <div className="space-y-2 text-sm md:text-base">
                <p className="font-medium text-slate-900">
                  Sunday, 7 December 2025
                </p>
                <p>Arrival from 2:00pm • Nikah at 3:00pm, Insha&apos;Allah</p>
                <p className="mt-3 font-medium text-slate-900">
                  VENUENAME
                </p>
                <p>Peterborough, United Kingdom</p>
              </div>

              <p className="pt-2 text-sm text-slate-500">
                Your presence and du&apos;ās would mean so much to the couple as
                they begin this blessed journey together.
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
                <p>Modest, elegant attire in soft pastels.</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Occasion</p>
                <p>
                  Nikah ceremony followed by a reception with family and
                  friends, Insha&apos;Allah.
                </p>
              </div>
              <div>
                <p className="font-medium text-slate-900">RSVP</p>
                <p>
                  Kindly confirm your attendance by{" "}
                  <span className="font-semibold text-rose-500">
                    1 November 2025
                  </span>
                  , so arrangements can be made with ease.
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-slate-400 text-right">
              Imaan &amp; Groom • 07.12.25 • Nikah
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
