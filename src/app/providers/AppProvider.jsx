import AppRouterProvider from "./AppRouterProvider"
import QueryProvider from "./QueryProvider"

function AppProvider() {
  return (
    <QueryProvider>
      <AppRouterProvider />
    </QueryProvider>
  )
}

export default AppProvider
