import { Outlet } from "react-router"

import MainNavigation from "@/shared/components/MainNavigation"

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
