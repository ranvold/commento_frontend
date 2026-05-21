import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createComment } from "../../api/comments"
import { commentKeys } from "../../utils/queryKeys"

function CommentForm({ setFirstPage }) {
  const [body, setBody] = useState("")
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createComment,

    onSuccess: async () => {
      setFirstPage()
      setBody("")
      await queryClient.invalidateQueries({ queryKey: commentKeys.all })
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    mutation.mutate({ body })
  }
  return (
    <form onSubmit={handleSubmit} method="post" className="mb-4">
      <div className="mb-2">
        <label
          htmlFor="body"
          className="block text-sm font-medium text-slate-700"
        >
          Add a comment
        </label>
        <textarea
          id="body"
          name="body"
          rows="3"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Posting..." : "Post Comment"}
      </button>
    </form>
  )
}

export default CommentForm
