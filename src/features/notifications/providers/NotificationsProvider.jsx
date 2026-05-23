import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { notificationsKeys } from "@/features/notifications/queries/notificationsKeys"

import { useAuth } from "@/features/auth/hooks/useAuth"

import { createCableConsumer } from "@/shared/libs/cable"

function NotificationsProvider({ children }) {
  const queryClient = useQueryClient()

  const { token } = useAuth()

  useEffect(() => {
    if (!token) return

    const consumer = createCableConsumer(token)

    const subscription = consumer.subscriptions.create("NotificationsChannel", {
      received(data) {
        if (data.type === "notification_created") {
          queryClient.invalidateQueries({
            queryKey: notificationsKeys.all,
          })
        }
      },
    })

    return () => {
      subscription.unsubscribe()
      consumer.disconnect()
    }
  }, [token, queryClient])

  return children
}

export default NotificationsProvider
