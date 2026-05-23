import { redirect } from "react-router"
import { getAuthToken } from "@/shared/utils/authToken"

export function guestOnlyLoader() {
  const token = getAuthToken()

  if (token) {
    return redirect("/")
  }

  return null
}
