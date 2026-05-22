import { api } from "@/shared/api/client"

export async function fetchCurrentUser() {
  return await api("/me")
}
