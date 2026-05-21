import { redirect } from "react-router"
import { clearAuthToken } from "../utils/authToken"
import { logoutRequest } from "../api/auth"

async function logoutAction() {
  await logoutRequest()

  clearAuthToken()

  return redirect("/login")
}

export default logoutAction
