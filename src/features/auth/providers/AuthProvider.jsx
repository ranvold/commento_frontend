import { useEffect, useMemo, useState } from "react"

import { fetchCurrentUser } from "@/features/users/api/fetchCurrentUser"

import {
  getAuthToken,
  setAuthToken,
  clearAuthToken,
} from "@/shared/utils/authToken"

import { AuthContext } from "../context/AuthContext"

function AuthProvider({ children }) {
  const [token, setToken] = useState(getAuthToken())

  const [user, setUser] = useState(null)

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        return
      }

      const user = await fetchCurrentUser()

      setUser(user)
    }

    restoreSession()
  }, [token])

  function login({ token }) {
    setAuthToken(token)

    setToken(token)
  }

  function logout() {
    clearAuthToken()

    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => {
    return {
      token,
      user,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }
  }, [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
