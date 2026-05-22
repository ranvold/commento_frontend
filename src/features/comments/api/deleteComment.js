import { api } from "@/shared/api/client"

export async function deleteComment(id) {
  return await api(`/comments/${id}`, {
    method: "DELETE",
  })
}
