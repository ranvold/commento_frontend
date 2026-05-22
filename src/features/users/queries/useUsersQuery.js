import { useQuery } from "@tanstack/react-query"

import { fetchUsers } from "../api/fetchUsers"
import { usersKeys } from "./usersKeys"

export function useUsersQuery(query = "", enabled = true) {
  return useQuery({
    queryKey: usersKeys.list(query),
    queryFn: () => fetchUsers(query),
    enabled,
    staleTime: 1000 * 60,
  })
}
