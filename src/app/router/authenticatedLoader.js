import { redirect } from "react-router"

import { getAuthToken } from "@/shared/utils/authToken"

import { fetchCurrentUser } from "@/features/users/api/fetchCurrentUser"

export async function authenticatedLoader() {
  const token = getAuthToken()

  if (!token) {
    throw redirect("/login")
  }

  const currentUser = await fetchCurrentUser()

  return { currentUser }
}

export function authenticatedShouldRevalidate({ defaultShouldRevalidate }) {
  return !getAuthToken() || defaultShouldRevalidate
}
