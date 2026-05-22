import { useCreateCommentMutation } from "../hooks/useCommentMutations"
import CommentEditor from "./CommentEditor"

function NewComment({ page, replaceToFirstPage }) {
  const createMutation = useCreateCommentMutation()

  function handleSubmit(body, reset) {
    createMutation.mutate(
      { body },
      {
        onSuccess: () => {
          reset()

          if (page !== 1) {
            replaceToFirstPage()
          }
        },
      }
    )
  }

  return (
    <CommentEditor
      submitLabel="Create"
      isPending={createMutation.isPending}
      onSubmit={handleSubmit}
    />
  )
}

export default NewComment
