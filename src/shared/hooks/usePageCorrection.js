import { useEffect } from "react"

export function usePageCorrection({
  count,
  totalCount,
  previousPage,
  replaceToPreviousPage,
}) {
  useEffect(() => {
    const shouldRedirect = count === 0 && totalCount > 0 && previousPage

    if (shouldRedirect) {
      replaceToPreviousPage(previousPage)
    }
  }, [count, totalCount, previousPage, replaceToPreviousPage])
}
