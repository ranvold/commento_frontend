import { useEffect } from "react"

export function usePageCorrection(data, replacePage) {
  useEffect(() => {
    if (!data) return

    const shouldRedirect = data.data.length === 0 && data.meta.count > 0

    if (shouldRedirect) {
      replacePage(data.meta.previous)
    }
  }, [data, replacePage])
}
