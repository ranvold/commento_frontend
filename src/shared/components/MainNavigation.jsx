import { useFetcher, Link } from "react-router"
import { getAuthToken } from "@/shared/utils/authToken"

function MainNavigation() {
  const isUserLoggedIn = getAuthToken()

  const fetcher = useFetcher()

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link className="text-white text-lg font-semibold" to="/">
            Commento
          </Link>
        </div>

        <div>
          {isUserLoggedIn ? (
            <div className="flex">
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/notifications"
              >
                Notifications
              </Link>
              <fetcher.Form method="post" action="/logout">
                <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </fetcher.Form>
            </div>
          ) : (
            <div className="flex">
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default MainNavigation
