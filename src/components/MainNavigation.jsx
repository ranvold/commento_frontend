import { Form, Link, useRouteLoaderData } from "react-router"

function MainNavigation() {
  const token = useRouteLoaderData("root")

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link className="text-white text-lg font-semibold" to="/">
            Commento
          </Link>
        </div>

        <div>
          {token ? (
            <div className="flex">
              <Link
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/notifications"
              >
                Notifications
              </Link>
              <Form method="post" action="/logout">
                <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </Form>
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
