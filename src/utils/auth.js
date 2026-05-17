import { redirect } from "react-router"

export function getAuthToken() {
  return localStorage.getItem("token")
}

export function setAuthToken(token) {
  localStorage.setItem("token", token)
}

export function clearAuthToken() {
  localStorage.removeItem("token")
}

export function tokenLoader() {
  return getAuthToken()
}

export function checkAuthLoader() {
  const token = getAuthToken()

  if (!token) {
    return redirect("/login")
  }

  return null
}
