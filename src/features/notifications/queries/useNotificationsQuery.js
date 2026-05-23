import { useQuery } from "@tanstack/react-query"

import { getAuthToken } from "@/shared/utils/authToken"

import { fetchNotifications } from "../api/fetchNotifications"
import { notificationsKeys } from "./notificationsKeys"

export function useNotificationsQuery(params) {
  const token = getAuthToken()

  return useQuery({
    queryKey: notificationsKeys.list(token, params),
    queryFn: () => fetchNotifications(params),
  })
}
