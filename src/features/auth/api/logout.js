import { api } from "@/shared/api/client"

export async function logout() {
  return await api("/session", {
    method: "DELETE",
  })
}
