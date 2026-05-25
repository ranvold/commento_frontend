import CommentCard from "./CommentCard"

import { useAuth } from "@/features/auth/hooks/useAuth"

function CommentList({ comments, totalCount }) {
  const { user } = useAuth()
  const resolvedCount =
    typeof totalCount === "number" ? totalCount : comments.length
  const commentsCountLabel = `${resolvedCount} comment${resolvedCount === 1 ? "" : "s"}`

  if (comments.length === 0) {
    return (
      <section className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white/70 p-6 text-center shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          No comments yet
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Start the conversation by posting the first comment.
        </p>
      </section>
    )
  }

  return (
    <section className="mt-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Comments</h2>
          <p className="text-sm text-slate-500">
            Recent discussion with author and activity details.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">
          {commentsCountLabel}
        </span>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} user={user} />
        ))}
      </div>
    </section>
  )
}

export default CommentList
