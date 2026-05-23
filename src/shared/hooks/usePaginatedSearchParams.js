import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router"

export function usePaginatedSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawPage = Number(searchParams.get("page"))

  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1

  const query = searchParams.get("query") || ""

  const params = useMemo(() => ({ page, query }), [page, query])

  const updateSearchParams = useCallback(
    (update, options) => {
      setSearchParams((current) => {
        const next = new URLSearchParams(current)
        update(next)
        return next
      }, options)
    },
    [setSearchParams]
  )

  const setPage = useCallback(
    (page) => {
      updateSearchParams((next) => {
        next.set("page", String(page))
      })
    },
    [updateSearchParams]
  )

  const setQuery = useCallback(
    (query) => {
      updateSearchParams(
        (next) => {
          if (query) {
            next.set("query", query)
          } else {
            next.delete("query")
          }

          next.set("page", "1")
        },
        { replace: true }
      )
    },
    [updateSearchParams]
  )

  const replacePage = useCallback(
    (page) => {
      updateSearchParams(
        (next) => {
          next.set("page", String(page))
        },
        { replace: true }
      )
    },
    [updateSearchParams]
  )

  const replaceToFirstPage = useCallback(() => {
    replacePage(1)
  }, [replacePage])

  return {
    page,
    query,
    params,
    setPage,
    replacePage,
    setQuery,
    replaceToFirstPage,
  }
}
