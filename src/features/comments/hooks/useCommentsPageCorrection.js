import { useEffect } from "react"

export function useCommentsPageCorrection({
  commentsCount,
  totalCount,
  previousPage,
  replacePage,
}) {
  useEffect(() => {
    const shouldRedirect = commentsCount === 0 && totalCount > 0 && previousPage

    if (shouldRedirect) {
      replacePage(previousPage)
    }
  }, [commentsCount, totalCount, previousPage, replacePage])
}
