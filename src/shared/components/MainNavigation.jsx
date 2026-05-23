import { Link } from "react-router"

import { useAuth } from "@/features/auth/hooks/useAuth"
import { useLogoutMutation } from "@/features/auth/hooks/useLogoutMutation"
import { useUnreadNotificationsCount } from "@/features/notifications/queries/useUnreadNotificationsCountQuery"

function MainNavigation() {
  const { isAuthenticated } = useAuth()
  const logoutMutation = useLogoutMutation()
  const unreadNotificationsCountQuery =
    useUnreadNotificationsCount(isAuthenticated)
  const unreadNotificationsCount =
    unreadNotificationsCountQuery.data?.unread_count ?? 0
  const hasUnreadNotifications = unreadNotificationsCount > 0

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link className="text-white text-lg font-semibold" to="/">
            Commento
          </Link>
        </div>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              <Link
                className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/notifications"
              >
                Notifications
                {hasUnreadNotifications && (
                  <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-xs font-semibold leading-none text-white">
                    {unreadNotificationsCount > 99
                      ? "99+"
                      : unreadNotificationsCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium disabled:cursor-not-allowed disabled:text-gray-500"
                disabled={logoutMutation.isPending}
                onClick={() => logoutMutation.mutate()}
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <div className="flex">
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default MainNavigation
