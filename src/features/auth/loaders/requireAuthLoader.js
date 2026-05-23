import { redirectDocument } from "react-router"

import { getAuthToken } from "@/shared/utils/authToken"

export async function requireAuthLoader() {
  const token = getAuthToken()

  if (!token) {
    return redirectDocument("/login")
  }

  return null
}

export function requireAuthShouldRevalidate({ defaultShouldRevalidate }) {
  return !getAuthToken() || defaultShouldRevalidate
}
