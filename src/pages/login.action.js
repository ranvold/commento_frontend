import { redirect } from "react-router"
import { buildApiUrl } from "../utils/api"
import { setAuthToken } from "../utils/auth"

async function loginAction({ request }) {
  const formData = await request.formData()

  const username = formData.get("username")
  const password = formData.get("password")

  const response = await fetch(buildApiUrl("/api/v1/session"), {
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
        message: errorData.message || "Could not log in user.",
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

export default loginAction
