import { api } from "@/shared/api/client"

export async function fetchNotifications({ page = 1 } = {}) {
  return await api("/notifications", {
    params: { page },
  })
}
