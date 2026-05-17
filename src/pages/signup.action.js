import { redirect } from "react-router"
import { buildApiUrl } from "../utils/api"
import { setAuthToken } from "../utils/auth"

async function signupAction({ request }) {
  const formData = await request.formData()

  const username = formData.get("username")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  if (password !== confirmPassword) {
    return {
      message: {
        confirmPassword: "Passwords do not match.",
      },
    }
  }

  const response = await fetch(buildApiUrl("/api/v1/signup"), {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })

  const data = await response.json()

  if (response.status === 422) {
    return data
  }

  if (!response.ok) {
    const errorData = data
    throw new Response(
      JSON.stringify({
        message: errorData.message || "Could not sign up user.",
      }),
      {
        status: response.status,
      }
    )
  }

  const { token } = data
  setAuthToken(token)

  return redirect("/")
}

export default signupAction
