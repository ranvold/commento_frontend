import { RouterProvider } from "react-router/dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./api/client"

import { createBrowserRouter } from "react-router"

import RootLayout from "./pages/Root"
import ErrorPage from "./pages/Error"

import loginAction from "./actions/login"
import LoginPage from "./pages/Login"

import requireGuestLoader from "./loaders/requireGuest"
import signupAction from "./actions/signup"
import SignupPage from "./pages/Signup"

import authenticatedLoader from "./loaders/authenticated"

import HomePage from "./pages/Home"

import NotificationsPage from "./pages/Notifications"

import logoutAction from "./actions/logout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        loader: requireGuestLoader,
        action: loginAction,
        element: <LoginPage />,
      },
      {
        path: "signup",
        loader: requireGuestLoader,
        action: signupAction,
        element: <SignupPage />,
      },
      {
        id: "authenticated",
        loader: authenticatedLoader,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
          {
            path: "logout",
            action: logoutAction,
            element: null,
          },
        ],
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
