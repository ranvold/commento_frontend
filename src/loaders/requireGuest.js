import { redirect } from "react-router"
import { getAuthToken } from "../utils/authToken"

function requireGuestLoader() {
  const token = getAuthToken()

  if (token) {
    throw redirect("/")
  }

  return null
}

export default requireGuestLoader
