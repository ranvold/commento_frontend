import ApiError from "@/errors/ApiError"
import { clearAuthToken, getAuthToken } from "@/shared/utils/authToken"

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL

const API_URL = `${BASE_API_URL}/api/v1`

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
