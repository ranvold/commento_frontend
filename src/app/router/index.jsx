import { createBrowserRouter } from "react-router"

import ErrorPage from "@/shared/components/Error"
import RootLayout from "@/shared/components/Root"

import LoginPage from "@/pages/Login"

import { guestOnlyLoader } from "@/features/auth/loaders/guestOnlyLoader"
import SignupPage from "@/pages/Signup"

import {
  requireAuthLoader,
  requireAuthShouldRevalidate,
} from "@/features/auth/loaders/requireAuthLoader"

import HomePage from "@/pages/Home"

import NotificationsPage from "@/pages/Notifications"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        loader: guestOnlyLoader,
        element: <LoginPage />,
      },
      {
        path: "signup",
        loader: guestOnlyLoader,
        element: <SignupPage />,
      },
      {
        id: "authenticated",
        loader: requireAuthLoader,
        shouldRevalidate: requireAuthShouldRevalidate,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
        ],
      },
    ],
  },
])

export default router
