import { ApiError } from "../errors/ApiError"
import { QueryClient } from "@tanstack/react-query"
import { getAuthToken, clearAuthToken } from "../utils/authToken"

export const queryClient = new QueryClient()

const API_URL = "http://localhost:3000/api/v1"

export async function api(path, options = {}) {
  const token = getAuthToken()
  const { params, headers, ...fetchOptions } = options
  const url = new URL(`${API_URL}${path}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return
      }

      url.searchParams.set(key, String(value))
    })
  }

  const response = await fetch(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(fetchOptions.body && { "Content-Type": "application/json" }),
      ...headers,
    },
    ...fetchOptions,
  })

  let data

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (response.status === 401) {
    clearAuthToken()
  }

  if (!response.ok) {
    throw new ApiError(response.status, data)
  }

  return data
}
