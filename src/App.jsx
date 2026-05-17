export default function App() {
  return (
    <main className="min-h-screen px-6 py-16 text-slate-950 sm:px-10 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <section className="space-y-8">
          <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-sm font-medium text-cyan-900">
            React + Tailwind CSS
          </span>

          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
              Fresh setup
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              The starter CSS is gone. Tailwind is wired and ready.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Build UI with utility classes directly in your React components.
              No default Vite demo styles, no extra stylesheet ceremony.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              href="https://tailwindcss.com/docs"
              target="_blank"
              rel="noreferrer"
            >
              Tailwind docs
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              href="https://react.dev/learn"
              target="_blank"
              rel="noreferrer"
            >
              React docs
            </a>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">Start here</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                First Tailwind component
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Active
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-slate-950 p-5 text-slate-50">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                Edit
              </p>
              <code className="mt-3 block text-sm text-cyan-300">
                src/App.jsx
              </code>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Utilities</p>
                <p className="mt-2 text-base text-slate-700">
                  Compose layout, spacing, color, and typography inline.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">Global CSS</p>
                <p className="mt-2 text-base text-slate-700">
                  Keep only the Tailwind import and any true app-wide styles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
