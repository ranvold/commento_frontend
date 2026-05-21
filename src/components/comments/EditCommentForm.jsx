import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateComment } from "../../api/comments"
import { commentKeys } from "../../utils/queryKeys"
import { useModal } from "../ui/modal-context"

function EditCommentForm({ commentId, initialBody }) {
  const [body, setBody] = useState(initialBody)
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, values }) => updateComment(id, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commentKeys.all })
      closeModal()
    },
  })

  function handleSubmit(event) {
    event.preventDefault()
    updateCommentMutation.mutate({
      id: commentId,
      values: { body },
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor={`edit-comment-${commentId}`}
        >
          Comment
        </label>
        <textarea
          autoFocus
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          id={`edit-comment-${commentId}`}
          name="body"
          onChange={(event) => setBody(event.target.value)}
          required
          rows="5"
          value={body}
        ></textarea>
      </div>

      {updateCommentMutation.isError && (
        <p className="rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
          We couldn't save your changes. Please try again.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={updateCommentMutation.isPending}
          onClick={closeModal}
          type="button"
        >
          Cancel
        </button>
        <button
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={updateCommentMutation.isPending || body.trim().length === 0}
          type="submit"
        >
          {updateCommentMutation.isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  )
}

export default EditCommentForm
