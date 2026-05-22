import { api } from "@/shared/api/client"

export async function updateComment(id, values) {
  return await api(`/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ comment: values }),
  })
}
