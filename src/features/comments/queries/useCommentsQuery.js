import { useQuery } from "@tanstack/react-query"

import { fetchComments } from "../api/fetchComments"
import { commentsKeys } from "./commentsKeys"

export function useCommentsQuery(params) {
  return useQuery({
    queryKey: commentsKeys.list(params),

    queryFn: () => fetchComments(params),
  })
}
