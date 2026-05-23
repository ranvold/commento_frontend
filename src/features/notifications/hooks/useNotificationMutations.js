import { useMutation } from "@tanstack/react-query"

import { queryClient } from "@/shared/libs/queryClient"

import { markNotificationAsRead } from "../api/markNotificationAsRead"
import { markAllNotificationsAsRead } from "../api/markAllNotificationsAsRead"

import { notificationsKeys } from "../queries/notificationsKeys"

export function useMarkNotificationAsReadMutation() {
  return useMutation({
    mutationFn: markNotificationAsRead,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      })
    },
  })
}

export function useMarkAllNotificationsAsReadMutation() {
  return useMutation({
    mutationFn: markAllNotificationsAsRead,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: notificationsKeys.all,
      })
    },
  })
}
