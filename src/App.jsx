import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

import RootLayout from "./pages/Root"
import ErrorPage from "./pages/Error"
import { tokenLoader, checkAuthLoader } from "./utils/auth"
import HomePage from "./pages/Home"
import homeLoader from "./pages/home.loader"
import LoginPage from "./pages/Login"
import loginAction from "./pages/login.action"
import SignupPage from "./pages/Signup"
import signupAction from "./pages/signup.action"
import NotificationsPage from "./pages/Notifications"
import notificationsLoader from "./pages/notifications.loader"
import logoutAction from "./pages/logout.action"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "signup",
        element: <SignupPage />,
        action: signupAction,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
        loader: notificationsLoader,
      },
      {
        path: "logout",
        element: null,
        loader: checkAuthLoader,
        action: logoutAction,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
