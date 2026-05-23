import NotificationCard from "./NotificationCard"

import { useAuth } from "@/features/auth/hooks/useAuth"

import { useMarkAllNotificationsAsReadMutation } from "../hooks/useNotificationMutations"

function NotificationList({ notifications }) {
  const { user } = useAuth()
  const markAllAsReadMutation = useMarkAllNotificationsAsReadMutation()
  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.read_at
  )

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Notifications
          </h1>
          <p className="text-sm text-slate-600">
            Recent activity related to your account.
          </p>
        </div>

        {hasUnreadNotifications && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={markAllAsReadMutation.isPending}
            onClick={() => markAllAsReadMutation.mutate()}
          >
            {markAllAsReadMutation.isPending
              ? "Marking all..."
              : "Mark all as read"}
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              user={user}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600">
          You have no notifications yet.
        </div>
      )}
    </section>
  )
}

export default NotificationList
