import { redirect } from "react-router"
import { getAuthToken } from "@/shared/utils/authToken"

export function requireGuestLoader() {
  const token = getAuthToken()

  if (token) {
    throw redirect("/")
  }

  return null
}
