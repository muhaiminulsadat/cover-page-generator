import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Fill the form",
    desc: "Name, ID, section, course. Even half-asleep you can do this.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Preview it",
    desc: "Looks exactly like a proper BUET cover page. Shocking, we know.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Print & submit",
    desc: "Go submit. Act like you worked really hard on it.",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
  },
];

export default function FunLandingPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F8] flex flex-col max-w-[390px] mx-auto relative overflow-hidden font-sans">
      {/* Subtle texture blob */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top right, #f5c4c420 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        {/* ── NAV ── */}
        <nav className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#8B1A1A] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-[19px] text-[#8B1A1A] tracking-tight">
              CoverVai
            </span>
          </div>
          <span className="text-[10px] font-medium text-[#8B1A1A] bg-[#8B1A1A]/8 border border-[#8B1A1A]/15 px-3 py-1 rounded-full tracking-wide">
            BUET Only 🎓
          </span>
        </nav>

        {/* ── HERO ── */}
        <section className="px-5 pt-9 pb-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#8B1A1A]/70 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]/50 animate-pulse" />
            No MS Word. No suffering.
          </div>

          <h1 className="text-[38px] font-extrabold leading-[1.08] tracking-tight text-zinc-900 mb-4">
            Your lab cover.
            <br />
            <span className="text-[#8B1A1A] italic font-black">
              Done in 30s.
            </span>
            <span className="text-zinc-900"> ✦</span>
          </h1>

          <p className="text-[13.5px] text-zinc-500 leading-relaxed mb-7 max-w-[310px]">
            Stop opening MS Word at 2am just to type your name on a cover page.
            We built this so you don&apos;t have to.
          </p>

          <Link
            href="/create"
            className="group flex items-center justify-between w-full bg-[#8B1A1A] text-white px-5 py-3.5 rounded-xl font-semibold text-[14px] mb-3 transition-all duration-150 active:scale-[0.98] hover:bg-[#7a1717]"
          >
            Make My Cover Page
            <span className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <p className="text-[11px] text-zinc-400 text-center">
            Free forever · No login · Print-ready PDF
          </p>
        </section>

        {/* ── DOCUMENT MOCKUP ── */}
        <section className="mx-5 mt-7 mb-6 bg-white border border-zinc-100 rounded-2xl p-4 shadow-[0_2px_16px_0_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Corner tag */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9.5px] font-medium text-emerald-600">
              Print ready
            </span>
          </div>

          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-3.5">
            Preview
          </p>

          {/* Simulated cover page */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5 text-center">
            {/* BUET crest placeholder */}
            <div className="w-10 h-10 rounded-full border-2 border-[#8B1A1A]/25 mx-auto mb-3 flex items-center justify-center bg-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B1A1A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <p className="text-[7.5px] font-semibold text-zinc-500 uppercase tracking-wider mb-0.5">
              Bangladesh University of Engineering and Technology
            </p>
            <p className="text-[7px] text-zinc-400 mb-3">Dhaka — 1000</p>

            <div className="h-px bg-zinc-200 mb-3" />

            <p className="text-[11px] font-bold text-[#8B1A1A] mb-0.5">
              CE 320
            </p>
            <p className="text-[9px] font-medium text-zinc-700 mb-3">
              Steel Structure Design
            </p>

            <div className="h-px bg-zinc-200 mb-3" />

            <p className="text-[7.5px] text-zinc-400 leading-relaxed">
              Submitted by:{" "}
              <span className="text-zinc-600 font-medium">Your Name Here</span>
              <br />
              Student ID:{" "}
              <span className="text-zinc-600 font-medium">21XXXXX</span>
              &nbsp;·&nbsp; Section:{" "}
              <span className="text-zinc-600 font-medium">A1</span>
              <br />
              <span className="text-zinc-400">
                Submitted to: Prof. Dr. Someone
              </span>
            </p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="grid grid-cols-2 gap-3 mx-5 mb-7">
          <div className="bg-white border border-zinc-100 rounded-2xl p-4 shadow-[0_1px_8px_0_rgba(0,0,0,0.04)]">
            <p className="text-[30px] font-black text-zinc-800 leading-none mb-1">
              15<span className="text-xl font-bold">m</span>
            </p>
            <p className="text-[11px] text-zinc-400 leading-snug">
              wasted on MS Word 😭
            </p>
          </div>
          <div className="bg-[#8B1A1A] rounded-2xl p-4 shadow-[0_1px_8px_0_rgba(139,26,26,0.18)]">
            <p className="text-[30px] font-black text-white leading-none mb-1">
              30<span className="text-xl font-bold">s</span>
            </p>
            <p className="text-[11px] text-white/70 leading-snug">
              with CoverVai 😎
            </p>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="mx-5 mb-7">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="h-px flex-1 bg-zinc-100" />
            <p className="text-[10.5px] font-semibold text-zinc-400 uppercase tracking-widest">
              How it works
            </p>
            <div className="h-px flex-1 bg-zinc-100" />
          </div>

          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="flex gap-3.5 items-start bg-white border border-zinc-100 rounded-xl px-4 py-3.5 shadow-[0_1px_6px_0_rgba(0,0,0,0.04)]"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    i === 0
                      ? "bg-[#8B1A1A] text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-mono text-zinc-300">
                      {s.n}
                    </span>
                    <p className="text-[13px] font-semibold text-zinc-800">
                      {s.title}
                    </p>
                  </div>
                  <p className="text-[12px] text-zinc-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="mx-5 mb-7 bg-[#8B1A1A]/5 border border-[#8B1A1A]/10 rounded-2xl p-4">
          <p className="text-[12px] text-zinc-600 leading-relaxed italic mb-3">
            &ldquo;Finally. I used to spend 10 minutes just centering my name.
            This is a blessing.&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#8B1A1A]/15 flex items-center justify-center text-[9px] font-bold text-[#8B1A1A]">
              R
            </div>
            <p className="text-[11px] text-zinc-400">
              Rafid — CSE&apos;22, BUET
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="mt-auto px-5 py-5 border-t border-zinc-100 text-center">
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Built for BUET students, by a BUET student
            <br />
            who was also too lazy to open MS Word —{" "}
            <span className="text-[#8B1A1A] font-semibold">Sadat</span>
          </p>
          <p className="text-[10px] text-zinc-300 mt-2">
            © {new Date().getFullYear()} CoverVai · Made with ☕ and
            procrastination
          </p>
        </footer>
      </div>
    </main>
  );
}
