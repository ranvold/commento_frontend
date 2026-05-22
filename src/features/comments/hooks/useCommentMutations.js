import { useMutation } from "@tanstack/react-query"

import { queryClient } from "@/shared/libs/queryClient"

import { createComment } from "../api/createComment"
import { updateComment } from "../api/updateComment"
import { deleteComment } from "../api/deleteComment"

import { commentsKeys } from "../queries/commentsKeys"

export function useCreateCommentMutation() {
  return useMutation({
    mutationFn: createComment,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentsKeys.all,
      })
    },
  })
}

export function useUpdateCommentMutation() {
  return useMutation({
    mutationFn: ({ id, values }) => updateComment(id, values),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentsKeys.all,
      })
    },
  })
}

export function useDeleteCommentMutation() {
  return useMutation({
    mutationFn: deleteComment,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: commentsKeys.all,
      })
    },
  })
}
