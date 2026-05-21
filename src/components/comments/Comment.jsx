import { useMutation } from "@tanstack/react-query"

import { queryClient } from "../../api/client"
import { deleteComment } from "../../api/comments"
import { commentKeys } from "../../utils/queryKeys"
import { useModal } from "../ui/modal-context"
import EditCommentForm from "./EditCommentForm"

const commentDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

function Comment({ comment, currentUser }) {
  const { openConfirm, openModal } = useModal()
  const isOwner = currentUser && currentUser.id === comment.user_id

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commentKeys.all })
    },
  })

  const authorName = comment.user.username
  const createdAt = new Date(comment.created_at)
  const updatedAt = new Date(comment.updated_at)
  const formattedCreatedAt = Number.isNaN(createdAt.getTime())
    ? comment.created_at
    : commentDateFormatter.format(createdAt)
  const formattedUpdatedAt = Number.isNaN(updatedAt.getTime())
    ? comment.updated_at
    : commentDateFormatter.format(updatedAt)
  const isEdited = comment.updated_at
    ? !Number.isNaN(createdAt.getTime()) && !Number.isNaN(updatedAt.getTime())
      ? createdAt.getTime() !== updatedAt.getTime()
      : comment.created_at !== comment.updated_at
    : false

  function handleStartDelete() {
    openConfirm({
      title: "Delete this comment?",
      description: "This action cannot be undone.",
      confirmLabel: "Yes, delete",
      confirmTone: "danger",
      pendingLabel: "Deleting...",
      onConfirm: () => deleteCommentMutation.mutateAsync(comment.id),
    })
  }

  function handleStartEdit() {
    openModal({
      title: "Edit comment",
      description: "Update your message and save your changes.",
      hideActions: true,
      isDismissible: false,
      panelClassName: "max-w-xl",
      content: (
        <EditCommentForm commentId={comment.id} initialBody={comment.body} />
      ),
    })
  }

  let content = (
    <>
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{authorName}</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
              <p>{formattedCreatedAt}</p>
              {isEdited && (
                <p className="font-medium text-slate-400">
                  Edited {formattedUpdatedAt}
                </p>
              )}
            </div>
          </div>
          {isOwner && (
            <div className="flex items-center gap-3">
              <button
                className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
                onClick={handleStartEdit}
                type="button"
              >
                Edit
              </button>
              <button
                className="text-sm font-medium text-red-500 transition hover:text-red-600"
                onClick={handleStartDelete}
                type="button"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
          {comment.body}
        </p>
      </div>
    </>
  )

  return <>{content}</>
}

export default Comment
