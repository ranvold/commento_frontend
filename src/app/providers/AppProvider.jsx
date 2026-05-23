import AppRouterProvider from "./AppRouterProvider"
import QueryProvider from "./QueryProvider"
import AuthProvider from "@/features/auth/providers/AuthProvider"
import NotificationsProvider from "@/features/notifications/providers/NotificationsProvider"

function AppProvider() {
  return (
    <QueryProvider>
      <AuthProvider>
        <NotificationsProvider>
          <AppRouterProvider />
        </NotificationsProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

export default AppProvider
