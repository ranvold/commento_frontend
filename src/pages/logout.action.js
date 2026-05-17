import { redirect } from "react-router"
import { buildApiUrl } from "../utils/api"
import { getAuthToken, clearAuthToken } from "../utils/auth"

async function logoutAction() {
  const response = await fetch(buildApiUrl("/api/v1/session"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Response(
      JSON.stringify({
        message: errorData.message || "Could not log out user.",
      }),
      {
        status: response.status,
      }
    )
  }

  clearAuthToken()
  return redirect("/login")
}

export default logoutAction
