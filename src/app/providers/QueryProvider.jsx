import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query"

import { queryClient } from "@/shared/libs/queryClient"

function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>{children}</QueryErrorResetBoundary>
    </QueryClientProvider>
  )
}

export default QueryProvider
