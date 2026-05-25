import { useEffect, useState } from "react"

import { useDebounce } from "@/shared/hooks/useDebounce"

function CommentSearchInput({ query, onQueryChange }) {
  const [value, setValue] = useState(query)

  const debouncedValue = useDebounce(value, 300)

  useEffect(() => {
    if (debouncedValue !== query) {
      onQueryChange(debouncedValue)
    }
  }, [debouncedValue, query, onQueryChange])

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setValue((currentValue) =>
        currentValue === query ? currentValue : query
      )
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [query])

  return (
    <div className="my-4">
      <label className="sr-only" htmlFor="comment-search">
        Search comments
      </label>
      <input
        autoComplete="off"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        id="comment-search"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search comments..."
        type="search"
        value={value}
      />
    </div>
  )
}

export default CommentSearchInput
