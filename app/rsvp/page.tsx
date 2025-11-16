"use client";

import { FormEvent, useState, useEffect } from "react";

type Attending = "yes" | "no" | "maybe" | "";

export default function RsvpPage() {
  const [partyName, setPartyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<Attending>("");
  const [guestCount, setGuestCount] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [dietary, setDietary] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // keep guestNames array in sync with guestCount
  useEffect(() => {
    setGuestNames((prev) => {
      const copy = [...prev];
      if (guestCount > copy.length) {
        while (copy.length < guestCount) copy.push("");
      } else if (guestCount < copy.length) {
        copy.length = guestCount;
      }
      return copy;
    });
  }, [guestCount]);

  function updateGuestName(index: number, value: string) {
    setGuestNames((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  }

  function makeDtStamp() {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const yyyy = d.getUTCFullYear();
    const mm = pad(d.getUTCMonth() + 1);
    const dd = pad(d.getUTCDate());
    const hh = pad(d.getUTCHours());
    const mi = pad(d.getUTCMinutes());
    const ss = pad(d.getUTCSeconds());
    return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
  }

  function handleDownloadIcs() {
    const dtstamp = makeDtStamp();
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Iman&Ibrahaem//Wedding//EN
BEGIN:VEVENT
UID:${dtstamp}-iman-ibrahaem-wedding@rsvp
DTSTAMP:${dtstamp}
DTSTART:20251207T140000Z
DTEND:20251207T190000Z
SUMMARY:Iman & Ibrahaem Nikah & Wedding Reception
LOCATION:VENUENAME, Peterborough
DESCRIPTION:Iman & Ibrahaem's Nikah ceremony and wedding reception.
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iman-ibrahaem-wedding.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleOpenGoogleCalendar() {
    const base = "https://www.google.com/calendar/render";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Iman & Ibrahaem Nikah & Wedding Reception",
      dates: "20251207T140000Z/20251207T190000Z",
      location: "VENUENAME, Peterborough",
      details:
        "Nikah ceremony followed by a wedding reception, Insha'Allah.",
    });
    const url = `${base}?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partyName,
          email,
          phone,
          attending,
          guestCount: attending === "no" ? 0 : guestCount,
          guestNames: attending === "no" ? [] : guestNames,
          dietary: attending === "no" ? "" : dietary,
          notes: attending === "no" ? "" : notes,
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

  // shared flag used in *both* success screen and form
  const showGuestDetails = attending === "yes" || attending === "maybe";

  // ✅ Thank-you + summary screen
  if (status === "success") {
    const notAttending = attending === "no";

    return (
      <main className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-sky-50 flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full space-y-6">
          {/* Thank you card */}
          <div className="rounded-3xl bg-white/90 border border-emerald-100 shadow-md p-7 text-center space-y-3">
            <h1 className="text-2xl font-semibold text-slate-800">
              JazakAllahu khayran ✨
            </h1>

            {notAttending ? (
              <>
                <p className="text-sm text-slate-600">
                  Thank you for letting us know you won&apos;t be able to
                  attend.
                </p>
                <p className="text-sm text-slate-600">
                  Iman &amp; Ibrahaem truly appreciate your response and your
                  du&apos;ās. You will be dearly missed on the day,
                  Insha&apos;Allah.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-600">
                  Your party&apos;s RSVP has been received.
                </p>
                <p className="text-sm text-slate-600">
                  Iman &amp; Ibrahaem are grateful for your du&apos;ās and look
                  forward to celebrating with you, Insha&apos;Allah.
                </p>
              </>
            )}
          </div>

          {/* Wedding + RSVP summary */}
          <div className="rounded-3xl bg-white/90 border border-rose-100 shadow-md p-7 space-y-5">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-rose-400">
                  Event Details
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-800">
                  Iman &amp; Ibrahaem&apos;s Nikah
                </h2>
              </div>
              {!notAttending && (
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 md:text-right">
                  <span className="inline-flex items-center rounded-full border border-rose-100 bg-rose-50 px-3 py-1">
                    📸 Please screenshot or save these details
                  </span>
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-1">
                <p className="font-medium text-slate-900">Date &amp; time</p>
                <p>Sunday, 7 December 2025</p>
                <p>Arrival from 2:00pm • Nikah at 3:00pm, Insha&apos;Allah</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-900">Location</p>
                <p>VENUENAME</p>
                <p>Peterborough, United Kingdom</p>
              </div>
            </div>

            <div className="border-t border-rose-50 pt-4 grid gap-4 md:grid-cols-2 text-sm text-slate-700">
              <div className="space-y-1">
                <p className="font-medium text-slate-900">Your RSVP</p>
                <p>Party / family: {partyName || "—"}</p>
                <p>
                  Attendance:{" "}
                  {attending === "yes"
                    ? "Attending, Insha'Allah"
                    : attending === "maybe"
                    ? "Maybe / not sure yet"
                    : "Not attending"}
                </p>
                {!notAttending && <p>Number of guests: {guestCount}</p>}
              </div>

              {!notAttending && (
                <div className="space-y-1">
                  <p className="font-medium text-slate-900">Guest names</p>
                  {guestNames.map((name, idx) => (
                    <p key={idx}>{name || `Guest ${idx + 1}`}</p>
                  ))}
                </div>
              )}
            </div>

            {!notAttending && (
              <>
                {(dietary || notes) && (
                  <div className="border-t border-rose-50 pt-4 grid gap-4 md:grid-cols-2 text-sm text-slate-700">
                    {dietary && (
                      <div className="space-y-1">
                        <p className="font-medium text-slate-900">
                          Dietary notes
                        </p>
                        <p>{dietary}</p>
                      </div>
                    )}
                    {notes && (
                      <div className="space-y-1">
                        <p className="font-medium text-slate-900">
                          Message for the couple
                        </p>
                        <p>{notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Calendar actions */}
                <div className="border-t border-rose-50 pt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleOpenGoogleCalendar}
                    className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-900 shadow-sm hover:bg-emerald-100"
                  >
                    Add to Google Calendar
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadIcs}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-100"
                  >
                    Download .ics calendar file
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  // ✅ Main form view
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-sky-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full">
        <div className="mb-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-rose-400">
            RSVP • Party Details
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-800">
            Iman &amp; Ibrahaem&apos;s Nikah
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sunday, 7 December 2025 • VENUENAME, Peterborough
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-3xl bg-white/90 border border-rose-100 shadow-md p-7 md:p-8 space-y-5 backdrop-blur"
        >
          {/* soft decorative blobs */}
          <div className="pointer-events-none absolute -top-12 -left-10 h-28 w-28 rounded-full bg-rose-100/80 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-36 w-36 rounded-full bg-emerald-100/80 blur-3xl" />

          {/* party contact + email/phone */}
          <div className="relative grid gap-5 md:grid-cols-3">
            <div className="space-y-1 md:col-span-1">
              <label className="text-sm font-medium text-slate-700">
                Party / family name
              </label>
              <input
                required
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                placeholder="e.g. Khan family, Iqbal party"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
              />
            </div>

            <div className="space-y-1 md:col-span-1">
              <label className="text-sm font-medium text-slate-700">
                Contact email (optional)
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1 md:col-span-1">
              <label className="text-sm font-medium text-slate-700">
                Contact phone (optional)
              </label>
              <input
                type="tel"
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                placeholder="e.g. 07..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* attending + party size */}
          <div className="relative grid gap-5 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Will your party be attending?
              </label>
              <select
                required
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                value={attending}
                onChange={(e) => setAttending(e.target.value as Attending)}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes, we will be there</option>
                <option value="no">No, we are unable to attend</option>
                <option value="maybe">Maybe / not sure yet</option>
              </select>
            </div>

            {showGuestDetails && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Number of guests in your party
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                  value={guestCount}
                  onChange={(e) =>
                    setGuestCount(Number(e.target.value) || 1)
                  }
                />
                <p className="text-[11px] text-slate-400">
                  Includes everyone in your party (adults and children).
                </p>
              </div>
            )}
          </div>

          {/* guest names */}
          {showGuestDetails && (
            <div className="relative space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Guest names
              </label>
              <p className="text-xs text-slate-500 mb-1">
                Please list the names of everyone in your party.
              </p>
              <div className="space-y-2">
                {guestNames.map((name, index) => (
                  <input
                    key={index}
                    required
                    className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                    placeholder={`Guest ${index + 1} full name`}
                    value={name}
                    onChange={(e) => updateGuestName(index, e.target.value)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* dietary */}
          {showGuestDetails && (
            <div className="relative space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Dietary requirements (for anyone in your party)
              </label>
              <input
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                placeholder="Vegetarian, vegan, allergies, etc."
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
              />
            </div>
          )}

          {/* notes */}
          {showGuestDetails && (
            <div className="relative space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Any notes or messages for the couple? (optional)
              </label>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-2 text-sm text-slate-800 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}

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
              {isSubmitting ? "Sending RSVP…" : "Submit party RSVP"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
