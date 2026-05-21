import { isRouteErrorResponse, useRouteError } from "react-router"

import PageContent from "../components/ui/PageContent"

function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <PageContent title={`${error.status} ${error.statusText}`}>
        <p>{error.data?.message || "An unexpected error occurred."}</p>
      </PageContent>
    )
  }

  const title = error.message || "Something went wrong."
  const message = "Please try again later."

  return (
    <>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  )
}

export default ErrorPage
