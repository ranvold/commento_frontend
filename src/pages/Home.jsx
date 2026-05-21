import { useRouteLoaderData } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { useCommentsParam } from "../hooks/useCommentsParam"
import { usePageCorrection } from "../hooks/usePageCorrection"
import { fetchComments } from "../api/comments"
import { commentKeys } from "../utils/queryKeys"

import Comments from "../components/comments/Comments"
import CommentForm from "../components/comments/CommentForm"
import CommentSearchInput from "../components/comments/CommentSearchInput"
import Pagination from "../components/ui/Pagination"

function HomePage() {
  const { page, query, setPage, setQuery, replacePage } = useCommentsParam()

  const { currentUser } = useRouteLoaderData("authenticated")
  const { data, isLoading } = useQuery({
    queryKey: commentKeys.page(page, query),
    queryFn: () => fetchComments({ page, query }),
  })

  usePageCorrection(data, replacePage)

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      {currentUser && <CommentForm setFirstPage={() => setPage(1)} />}
      <CommentSearchInput query={query} setQuery={setQuery} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Comments comments={data.data} />
          <Pagination meta={data.meta} onPageChange={setPage} />
        </>
      )}
    </main>
  )
}

export default HomePage
