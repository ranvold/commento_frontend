import { api } from "./client"

export async function fetchComments({ page = 1, query = "" } = {}) {
  return await api("/comments", {
    params: { page, query },
  })
}

export async function createComment(values) {
  return await api("/comments", {
    method: "POST",
    body: JSON.stringify({ comment: values }),
  })
}

export async function updateComment(id, values) {
  return await api(`/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ comment: values }),
  })
}

export async function deleteComment(id) {
  return await api(`/comments/${id}`, {
    method: "DELETE",
  })
}
