import { api } from "@/shared/api/client"

export async function markAllNotificationsAsRead() {
  return await api(`/notifications/mark_all_as_read`, {
    method: "PATCH",
  })
}
