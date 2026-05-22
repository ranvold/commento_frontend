import { api } from "@/shared/api/client"

export async function signup(values) {
  return await api("/signup", {
    method: "POST",
    body: JSON.stringify({ signup: values }),
  })
}
