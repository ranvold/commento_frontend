import { api } from "@/shared/api/client"

export async function markNotificationAsRead(id) {
  return await api(`/notifications/${id}/mark_as_read`, {
    method: "PATCH",
  })
}
