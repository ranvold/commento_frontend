import { api } from "@/shared/api/client"

export async function signup(values) {
  const signupValues = {
    username: values.username,
    password: values.password,
  }

  return await api("/signup", {
    method: "POST",
    body: JSON.stringify({ signup: signupValues }),
  })
}
