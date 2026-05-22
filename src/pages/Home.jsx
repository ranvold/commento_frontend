import { useCommentsQuery } from "@/features/comments/queries/useCommentsQuery"

import { useCommentsSearchParams } from "@/features/comments/hooks/useCommentsSearchParams"
import { useCommentsPageCorrection } from "@/features/comments/hooks/useCommentsPageCorrection"

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
  } = useCommentsSearchParams()

  const commentsQuery = useCommentsQuery(params)

  const comments = commentsQuery.data?.data ?? []
  const meta = commentsQuery.data?.meta

  useCommentsPageCorrection({
    commentsCount: comments.length,
    totalCount: meta?.count ?? 0,
    previousPage: meta?.previous,
    replacePage: replacePage,
  })

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <CreateComment page={page} replaceToFirstPage={replaceToFirstPage} />
      <CommentSearchInput query={query} onQueryChange={setQuery} />
      {commentsQuery.isLoading && <p>Loading...</p>}
      {!commentsQuery.isLoading && commentsQuery.data && (
        <>
          <CommentList comments={comments} />

          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}
    </main>
  )
}

export default HomePage
