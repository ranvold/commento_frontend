import { api } from "./client"

export async function signupRequest(values) {
  return await api("/signup", {
    method: "POST",
    body: JSON.stringify({ signup: values }),
  })
}

export async function loginRequest(values) {
  return await api("/session", {
    method: "POST",
    body: JSON.stringify({ session: values }),
  })
}

export async function logoutRequest() {
  return await api("/session", {
    method: "DELETE",
  })
}

export async function currentUserRequest() {
  return await api("/me")
}
