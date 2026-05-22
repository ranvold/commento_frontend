import { api } from "@/shared/api/client"

export async function fetchComments({ page = 1, query = "" } = {}) {
  return await api("/comments", {
    params: { page, query },
  })
}
