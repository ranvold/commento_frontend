import { useNotificationsQuery } from "@/features/notifications/queries/useNotificationsQuery"

import { usePaginatedSearchParams } from "@/shared/hooks/usePaginatedSearchParams"
import { usePageCorrection } from "@/shared/hooks/usePageCorrection"

import NotificationList from "@/features/notifications/components/NotificationList"
import Pagination from "@/shared/components/Pagination"

function NotificationsPage() {
  const { params, setPage, replacePage } = usePaginatedSearchParams()

  const notificationsQuery = useNotificationsQuery(params)

  const notifications = notificationsQuery.data?.data ?? []
  const meta = notificationsQuery.data?.meta

  usePageCorrection({
    count: notifications.length,
    totalCount: meta?.count ?? 0,
    previousPage: meta?.previous,
    replaceToPreviousPage: replacePage,
  })

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {notificationsQuery.isLoading && <p>Loading...</p>}

      {!notificationsQuery.isLoading && notificationsQuery.data && (
        <>
          <NotificationList notifications={notifications} />

          {meta && (meta.next || meta.previous) && (
            <Pagination meta={meta} onPageChange={setPage} />
          )}
        </>
      )}
    </main>
  )
}

export default NotificationsPage
