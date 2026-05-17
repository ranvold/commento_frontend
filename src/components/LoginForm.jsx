import { Form, useNavigation } from "react-router"

function LoginForm() {
  const navigation = useNavigation()

  const isSubmitting = navigation.state === "submitting"

  const labelClasses = "block text-sm font-medium text-slate-700"
  const inputClasses =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16">
      <Form
        method="post"
        className="mx-auto w-full max-w-md space-y-6 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-sky-100/70 backdrop-blur sm:p-8"
      >
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Welcome back
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Login
          </h2>
          <p className="text-sm text-slate-600">
            Sign in to continue to your account.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="username">
              Username
            </label>
            <input
              className={inputClasses}
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClasses} htmlFor="password">
              Password
            </label>
            <input
              className={inputClasses}
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <button
          className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </Form>
    </section>
  )
}

export default LoginForm
