function PageContent({ title, children }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-sky-100/70 backdrop-blur sm:p-8 lg:p-10">
        <div className="space-y-3 text-center sm:text-left">
          <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
            Notice
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
        </div>

        <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
          {children}
        </div>
      </div>
    </section>
  )
}

export default PageContent
