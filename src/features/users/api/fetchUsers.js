import { api } from "@/shared/api/client"

export async function fetchUsers(query = "") {
  return await api("/users", {
    params: { query },
  })
}
