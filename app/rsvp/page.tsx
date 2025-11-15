"use client";

import { FormEvent, useState } from "react";

type Attending = "yes" | "no" | "maybe" | "";

export default function RsvpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<Attending>("");
  const [guests, setGuests] = useState(1);
  const [dietary, setDietary] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          attending,
          guests,
          dietary,
          notes,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-sky-50 flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full rounded-3xl bg-white/90 border border-emerald-100 shadow-md p-8 text-center space-y-4">
          <h1 className="text-2xl font-semibold text-slate-800">
            Thank you for your RSVP ✨
          </h1>
          <p className="text-sm text-slate-600">
            Your response has been received. Imaan &amp; Groom can&apos;t wait to
            celebrate with you.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-sky-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full">
        <div className="mb-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-rose-400">
            RSVP
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-800">
            Imaan &amp; Groom&apos;s Wedding
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sunday, 7 December 2025 • VENUENAME
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-3xl bg-white/90 border border-rose-100 shadow-md p-7 md:p-8 space-y-5 backdrop-blur"
        >
          {/* soft decorative blobs */}
          <div className="pointer-events-none absolute -top-12 -left-10 h-28 w-28 rounded-full bg-rose-100/80 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-36 w-36 rounded-full bg-emerald-100/80 blur-3xl" />

          {/* name + email */}
          <div className="relative grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                required
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Email (optional, for updates)
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* attending + guests */}
          <div className="relative grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Will you be attending?
              </label>
              <select
                required
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                value={attending}
                onChange={(e) =>
                  setAttending(e.target.value as Attending)
                }
              >
                <option value="">Select an option</option>
                <option value="yes">Yes, I will be there</option>
                <option value="no">No, I&apos;m unable to attend</option>
                <option value="maybe">Maybe / not sure yet</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Number of guests (including you)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                required
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
          </div>

          {/* dietary */}
          <div className="relative space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Dietary requirements
            </label>
            <input
              className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
              placeholder="Vegetarian, vegan, allergies, etc."
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
            />
          </div>

          {/* notes */}
          <div className="relative space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Any notes? (optional)
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {status === "error" && (
            <p className="relative text-sm text-rose-500">
              Something went wrong while sending your RSVP. Please try again.
            </p>
          )}

          <div className="relative pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-full border border-rose-300 bg-rose-200/80 px-6 py-2.5 text-sm font-medium text-rose-900 shadow-sm transition hover:bg-rose-300 disabled:opacity-60"
            >
              {isSubmitting ? "Sending RSVP…" : "Submit RSVP"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
