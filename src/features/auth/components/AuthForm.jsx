import { Link } from "react-router"

function AuthForm({
  eyebrow,
  title,
  description,
  method = "post",
  onSubmit,
  fields,
  formError,
  isSubmitting,
  submitLabel,
  submittingLabel,
  alternateAction,
}) {
  const labelClasses = "block text-sm font-medium text-slate-700"
  const inputClasses =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16">
      <form
        method={method}
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-md space-y-6 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-sky-100/70 backdrop-blur sm:p-8"
      >
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="text-sm text-slate-600">{description}</p>
        </div>

        {formError && (
          <p className="rounded-2xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {formError}
          </p>
        )}

        <div className="space-y-5">
          {fields.map(({ label, error, id, name, ...inputProps }) => {
            const inputId = id || name

            return (
              <div key={name} className="space-y-2">
                <label className={labelClasses} htmlFor={inputId}>
                  {label}
                </label>
                <input
                  aria-invalid={Boolean(error)}
                  className={inputClasses}
                  id={inputId}
                  name={name}
                  {...inputProps}
                />
                {error && (
                  <p className="rounded-2xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {error}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>

        {alternateAction && (
          <p className="text-center text-sm text-slate-600">
            {alternateAction.prompt}{" "}
            <Link
              className="font-semibold text-sky-700 transition hover:text-sky-800 focus:outline-none focus:underline"
              to={alternateAction.to}
            >
              {alternateAction.label}
            </Link>
          </p>
        )}
      </form>
    </section>
  )
}

export default AuthForm
