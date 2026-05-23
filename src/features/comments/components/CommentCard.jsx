import { useState } from "react"

import CommentEditor from "./CommentEditor"

import HighlightedMentions from "@/shared/components/HighlightedMentions"

import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "../hooks/useCommentMutations"

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

  if (isEditing) {
    return (
      <div className="rounded border p-4">
        <CommentEditor
          initialValue={comment.body}
          submitLabel="Save"
          autoFocus
          isPending={updateMutation.isPending}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleUpdate}
        />
      </div>
    )
  }

  return (
    <div className="rounded border p-4">
      <p className="whitespace-pre-wrap">
        <HighlightedMentions
          text={comment.body}
          currentUsername={currentUsername}
        />
      </p>

      {isOwner && (
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-sm underline"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="text-sm underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default CommentCard
