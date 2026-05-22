import { useEffect } from "react"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { isRouteErrorResponse, useRouteError } from "react-router"

import PageContent from "@/shared/components/PageContent"

function getErrorMessage(error) {
  if (typeof error?.data === "string") {
    return error.data
  }

  return (
    error?.data?.message || error?.message || "An unexpected error occurred."
  )
}

function ErrorPage() {
  const error = useRouteError()
  const { reset } = useQueryErrorResetBoundary()

  useEffect(() => {
    reset()
  }, [reset])

  if (isRouteErrorResponse(error)) {
    return (
      <PageContent title={`${error.status} ${error.statusText || "Error"}`}>
        <p>{getErrorMessage(error)}</p>
      </PageContent>
    )
  }

  if (error?.status) {
    return (
      <PageContent title={`${error.status} ${error.statusText || "Error"}`}>
        <p>{getErrorMessage(error)}</p>
      </PageContent>
    )
  }

  const title = error?.message || "Something went wrong."
  const message = "Please try again later."

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  )
}

export default ErrorPage
