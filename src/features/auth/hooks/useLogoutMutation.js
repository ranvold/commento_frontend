import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { logout as logoutRequest } from "../api/logout"
import { useAuth } from "./useAuth"

export function useLogoutMutation() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      logout()
      navigate("/login")
    },
  })
}
