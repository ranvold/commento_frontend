import { redirect } from "react-router"
import { signupRequest } from "../api/auth"
import { setAuthToken } from "../utils/authToken"

async function signupAction({ request }) {
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
    const data = await signupRequest(values)

    setAuthToken(data.token)

    return redirect("/")
  } catch (error) {
    if (error.status === 422) {
      return {
        errors: error.data.errors,
      }
    }

    throw error
  }
}

export default signupAction
