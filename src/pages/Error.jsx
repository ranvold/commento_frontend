import { useEffect, useRef } from "react"
import { useRevalidator, useRouteError } from "react-router"
import MainNavigation from "../components/MainNavigation"
import { clearAuthToken } from "../utils/auth"

import PageContent from "../components/PageContent"

function ErrorPage() {
  const error = useRouteError()
  const { revalidate } = useRevalidator()
  const hasHandledUnauthorizedError = useRef(false)

  useEffect(() => {
    if (error?.status !== 401 || hasHandledUnauthorizedError.current) {
      return
    }

    hasHandledUnauthorizedError.current = true
    clearAuthToken()
    revalidate()
  }, [error, revalidate])

  let title = "An error occurred!"
  let message = "Something went wrong."

  if (error.status === 500) {
    message = error.data.message
  }

  if (error.status === 401) {
    title = "Unauthorized!"
    message = "You are not authorized to access this page."
  }

  if (error.status === 404) {
    title = "Not found!"
    message = "Could not find resource or page."
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default ErrorPage
