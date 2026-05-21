import { redirect } from "react-router"
import { getAuthToken } from "../utils/authToken"
import { currentUserRequest } from "../api/auth"

async function authenticatedLoader() {
  const token = getAuthToken()

  if (!token) {
    throw redirect("/login")
  }

  try {
    const currentUser = await currentUserRequest()
    return { currentUser }
  } catch (error) {
    if (error?.status === 401) {
      throw redirect("/login")
    }
    throw error
  }
}
export default authenticatedLoader
