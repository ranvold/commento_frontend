import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { isValidationError } from "@/shared/api/errorPolicy"

import { login as loginRequest } from "../api/login"
import { useAuth } from "./useAuth"

export function useLoginMutation() {
  const { login } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginRequest,
    throwOnError: (error) => error?.status !== 401 && !isValidationError(error),

    onSuccess: async (data) => {
      login(data)

      navigate("/")
    },
  })
}
