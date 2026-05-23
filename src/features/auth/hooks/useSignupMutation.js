import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { queryClient } from "@/shared/libs/queryClient"
import { isValidationError } from "@/shared/api/errorPolicy"

import { usersKeys } from "@/features/users/queries/usersKeys"

import { signup } from "../api/signup"
import { useAuth } from "./useAuth"

export function useSignupMutation() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signup,
    throwOnError: (error) => !isValidationError(error),

    onSuccess: async (data) => {
      login(data)

      await queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      })

      navigate("/")
    },
  })
}
