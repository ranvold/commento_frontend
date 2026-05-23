import { api } from "@/shared/api/client"

export async function fetchUnreadNotificationsCount() {
  return await api("/notifications/unread_count")
}
