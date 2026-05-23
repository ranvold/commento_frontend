import HighlightedMentions from "@/shared/components/HighlightedMentions"
import { getUsernameBadgeClassName } from "@/shared/utils/mentionHighlights"

import { useMarkNotificationAsReadMutation } from "../hooks/useNotificationMutations"

function formatCreatedAt(value) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function getNotificationMessage(notification) {
  if (notification.kind === "mention") {
    return "mentioned you in a comment"
  }

  return "sent you a notification"
}

function NotificationCard({ notification, user }) {
  const markAsReadMutation = useMarkNotificationAsReadMutation()

  const actorName = notification.actor?.username || "Someone"
  const actorBadgeClassName = getUsernameBadgeClassName(
    notification.kind === "mention" ? "alert" : "info"
  )
  const createdAt = formatCreatedAt(notification.created_at)
  const currentUsername = user?.username
  const notifiableBody = notification.notifiable?.body
  const isUnread = !notification.read_at

  return (
    <article
      className={[
        "rounded-lg border p-4 shadow-sm",
        isUnread ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-base font-medium text-slate-900">
            <span className={actorBadgeClassName}>{actorName}</span>{" "}
            <span>{getNotificationMessage(notification)}</span>
          </p>

          {notifiableBody && (
            <p className="whitespace-pre-wrap rounded-md bg-white px-3 py-2 text-sm text-slate-700">
              <HighlightedMentions
                text={notifiableBody}
                currentUsername={currentUsername}
              />
            </p>
          )}

          {createdAt && (
            <time
              dateTime={notification.created_at}
              className="block text-xs text-slate-500"
            >
              {createdAt}
            </time>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3">
          <span
            className={[
              "rounded-full px-2.5 py-1 text-xs font-medium",
              isUnread
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600",
            ].join(" ")}
          >
            {isUnread ? "Unread" : "Read"}
          </span>

          {isUnread && (
            <button
              type="button"
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
              disabled={markAsReadMutation.isPending}
              onClick={() => markAsReadMutation.mutate(notification.id)}
            >
              {markAsReadMutation.isPending ? "Marking..." : "Mark as read"}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default NotificationCard
