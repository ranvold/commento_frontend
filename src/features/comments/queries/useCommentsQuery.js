import { useQuery } from "@tanstack/react-query"

import { getAuthToken } from "@/shared/utils/authToken"

import { fetchComments } from "../api/fetchComments"
import { commentsKeys } from "./commentsKeys"

export function useCommentsQuery(params) {
  const token = getAuthToken()

  return useQuery({
    queryKey: commentsKeys.list(token, params),

    queryFn: () => fetchComments(params),
  })
}
