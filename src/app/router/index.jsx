import { createBrowserRouter } from "react-router"

import ErrorPage from "@/shared/components/Error"
import RootLayout from "@/shared/components/Root"

import { loginAction } from "@/features/auth/actions/login"
import LoginPage from "@/pages/Login"

import { requireGuestLoader } from "@/features/auth/loaders/requireGuestLoader"
import { signupAction } from "@/features/auth/actions/signup"
import SignupPage from "@/pages/Signup"

import {
  authenticatedLoader,
  authenticatedShouldRevalidate,
} from "./authenticatedLoader"

import HomePage from "@/pages/Home"

import NotificationsPage from "@/pages/Notifications"

import { logoutAction } from "@/features/auth/actions/logout"

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
        shouldRevalidate: authenticatedShouldRevalidate,
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

export default router
