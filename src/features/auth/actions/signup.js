import { redirect } from "react-router"

import { isValidationError } from "@/shared/api/errorPolicy"
import { queryClient } from "@/shared/libs/queryClient"
import { setAuthToken } from "@/shared/utils/authToken"

import { usersKeys } from "@/features/users/queries/usersKeys"

import { signup } from "../api/signup"

export async function signupAction({ request }) {
  const formData = await request.formData()

  const username = formData.get("username")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  const values = {
    username,
    password,
  }

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: ["Passwords do not match."],
      },
    }
  }
  try {
    const data = await signup(values)

    setAuthToken(data.token)

    await queryClient.invalidateQueries({
      queryKey: usersKeys.all,
    })

    return redirect("/")
  } catch (error) {
    if (isValidationError(error)) {
      return {
        errors: error.data.errors,
      }
    }

    throw error
  }
}
