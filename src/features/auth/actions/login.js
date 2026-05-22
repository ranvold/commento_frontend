import { redirect } from "react-router"

import { setAuthToken } from "@/shared/utils/authToken"

import { login } from "../api/login"

export async function loginAction({ request }) {
  const formData = await request.formData()

  const username = formData.get("username")
  const password = formData.get("password")

  const values = {
    username,
    password,
  }

  const data = await login(values)

  setAuthToken(data.token)

  return redirect("/")
}
