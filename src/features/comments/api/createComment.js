import { api } from "@/shared/api/client"

export async function createComment(values) {
  return await api("/comments", {
    method: "POST",
    body: JSON.stringify({ comment: values }),
  })
}
