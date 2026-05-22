import { redirect } from "react-router"
import { clearAuthToken } from "@/shared/utils/authToken"
import { logout } from "../api/logout"

export async function logoutAction() {
  await logout()

  clearAuthToken()

  return redirect("/login")
}
