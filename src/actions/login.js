import { redirect } from "react-router"
import { setAuthToken } from "../utils/authToken"
import { loginRequest } from "../api/auth"

async function loginAction({ request }) {
  const formData = await request.formData()

  const username = formData.get("username")
  const password = formData.get("password")

  const values = {
    username,
    password,
  }

  try {
    const data = await loginRequest(values)

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

export default loginAction
