import { useState } from "react"

import CommentEditor from "./CommentEditor"

import HighlightedMentions from "@/shared/components/HighlightedMentions"
import { getUsernameBadgeClassName } from "@/shared/utils/mentionHighlights"

import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "../hooks/useCommentMutations"

function parseDate(value) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date
}

function formatDateTime(value) {
  const date = parseDate(value)

  if (!date) {
    return null
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function isEdited(createdAtValue, updatedAtValue) {
  const createdAt = parseDate(createdAtValue)
  const updatedAt = parseDate(updatedAtValue)

  if (!createdAt || !updatedAt) {
    return false
  }

  return updatedAt.getTime() > createdAt.getTime()
}

function CommentCard({ comment, user }) {
  const [isEditing, setIsEditing] = useState(false)

  const updateMutation = useUpdateCommentMutation()
  const deleteMutation = useDeleteCommentMutation()

  function handleUpdate(body) {
    updateMutation.mutate(
      { id: comment.id, values: { body } },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      }
    )
  }

  function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return
    }

    deleteMutation.mutate(comment.id)
  }

  const isOwner = user && user.id === comment.user_id
  const currentUsername = user?.username
  const authorName =
    comment.user?.username ||
    (isOwner ? currentUsername : null) ||
    "Unknown user"
  const authorBadgeClassName = getUsernameBadgeClassName(
    isOwner ? "self" : "info"
  )
  const createdAt = formatDateTime(comment.created_at)
  const updatedAt = formatDateTime(comment.updated_at)
  const commentWasEdited = isEdited(comment.created_at, comment.updated_at)
  const authorInitial = authorName.charAt(0).toUpperCase()

  if (isEditing) {
    return (
      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Edit comment</p>
            {createdAt && (
              <p className="text-xs text-slate-500">
                Originally posted {createdAt}
              </p>
            )}
          </div>

          <span className={authorBadgeClassName}>{authorName}</span>
        </div>

        <CommentEditor
          initialValue={comment.body}
          submitLabel="Save"
          autoFocus
          isPending={updateMutation.isPending}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleUpdate}
        />
      </article>
    )
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              {authorInitial}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={authorBadgeClassName}>{authorName}</span>

                {isOwner && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-200">
                    You
                  </span>
                )}

                {commentWasEdited && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    Edited
                  </span>
                )}
              </div>

              {(createdAt || updatedAt) && (
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  {createdAt && (
                    <time dateTime={comment.created_at}>
                      Posted {createdAt}
                    </time>
                  )}

                  {commentWasEdited && updatedAt && (
                    <time dateTime={comment.updated_at}>
                      Updated {updatedAt}
                    </time>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 ring-1 ring-inset ring-slate-200">
            <p className="whitespace-pre-wrap">
              <HighlightedMentions
                text={comment.body}
                currentUsername={currentUsername}
              />
            </p>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  )
}

export default CommentCard
