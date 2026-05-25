import { useCommentsQuery } from "@/features/comments/queries/useCommentsQuery"

import { usePaginatedSearchParams } from "@/shared/hooks/usePaginatedSearchParams"
import { usePageCorrection } from "@/shared/hooks/usePageCorrection"

import CreateComment from "@/features/comments/components/NewComment"
import CommentList from "@/features/comments/components/CommentList"
import CommentSearchInput from "@/features/comments/components/CommentSearchInput"
import Pagination from "@/shared/components/Pagination"

function HomePage() {
  const {
    page,
    query,
    params,
    setPage,
    replacePage,
    setQuery,
    replaceToFirstPage,
  } = usePaginatedSearchParams()

  const commentsQuery = useCommentsQuery(params)

  const comments = commentsQuery.data?.data ?? []
  const meta = commentsQuery.data?.meta

  usePageCorrection({
    count: comments.length,
    totalCount: meta?.count ?? 0,
    previousPage: meta?.previous,
    replaceToPreviousPage: replacePage,
  })

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <CreateComment page={page} replaceToFirstPage={replaceToFirstPage} />
      <CommentSearchInput query={query} onQueryChange={setQuery} />
      {commentsQuery.isLoading && <p>Loading...</p>}
      {!commentsQuery.isLoading && commentsQuery.data && (
        <>
          <CommentList comments={comments} totalCount={meta?.count} />

          {meta && (meta.next || meta.previous) && (
            <Pagination meta={meta} onPageChange={setPage} />
          )}
        </>
      )}
    </main>
  )
}

export default HomePage
