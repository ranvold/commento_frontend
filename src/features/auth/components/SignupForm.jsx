import { useState } from "react"

import AuthForm from "./AuthForm"
import { useSignupMutation } from "../hooks/useSignupMutation"

function SignupForm() {
  const signup = useSignupMutation()

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({})

  const isSubmitting = signup.isPending

  function handleChange(event) {
    const { name, value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  function validate(values) {
    const errors = {}

    if (/\s|@/.test(values.username)) {
      errors.username = "must be a single word without spaces or @"
    }

    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = "Passwords do not match"
    }

    return errors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const values = {
      ...formValues,
      username: formValues.username.trim(),
    }
    const errors = validate(values)

    setFormValues(values)

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    setErrors({})

    signup.mutate(values, {
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
      autoComplete: "new-password",
      required: true,
      value: formValues.password,
      onChange: handleChange,
      error: errors.password,
    },
    {
      name: "passwordConfirmation",
      label: "Confirm Password",
      type: "password",
      autoComplete: "new-password",
      required: true,
      value: formValues.passwordConfirmation,
      onChange: handleChange,
      error: errors.passwordConfirmation,
    },
  ]

  return (
    <AuthForm
      eyebrow="Join in"
      title="Signup"
      description="Create an account to start participating in discussions."
      method="post"
      onSubmit={handleSubmit}
      fields={fields}
      formError={errors.form}
      isSubmitting={isSubmitting}
      submitLabel="Signup"
      submittingLabel="Signing up..."
      alternateAction={{
        prompt: "Already have an account?",
        label: "Login",
        to: "/login",
      }}
    />
  )
}

export default SignupForm
