import { useState } from "react"

import AuthForm from "./AuthForm"
import { useLoginMutation } from "../hooks/useLoginMutation"

function LoginForm() {
  const login = useLoginMutation()

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const isSubmitting = login.isPending

  function handleChange(event) {
    const { name, value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    setErrors({})

    login.mutate(formValues, {
      onError: (error) => {
        setErrors(
          error.data?.errors ?? {
            form: error.data?.message ?? error.message,
          }
        )
      },
    })
  }

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      autoComplete: "username",
      required: true,
      value: formValues.username,
      onChange: handleChange,
      error: errors.username,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      autoComplete: "current-password",
      required: true,
      value: formValues.password,
      onChange: handleChange,
      error: errors.password,
    },
  ]

  return (
    <AuthForm
      eyebrow="Welcome back"
      title="Login"
      description="Sign in to continue to your account."
      method="post"
      onSubmit={handleSubmit}
      fields={fields}
      formError={errors.form}
      isSubmitting={isSubmitting}
      submitLabel="Login"
      submittingLabel="Logging in..."
    />
  )
}

export default LoginForm
