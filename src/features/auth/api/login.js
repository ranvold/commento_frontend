import { api } from "@/shared/api/client"

export async function login(values) {
  return await api("/session", {
    method: "POST",
    body: JSON.stringify({ session: values }),
  })
}
