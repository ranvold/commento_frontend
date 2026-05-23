import { useQuery } from "@tanstack/react-query"

import { getAuthToken } from "@/shared/utils/authToken"

import { fetchUnreadNotificationsCount } from "../api/fetchUnreadNotificationsCount"
import { notificationsKeys } from "./notificationsKeys"

export function useUnreadNotificationsCount(enabled = true) {
  const token = getAuthToken()

  return useQuery({
    queryKey: notificationsKeys.unreadCount(token),
    queryFn: fetchUnreadNotificationsCount,
    enabled,
  })
}
