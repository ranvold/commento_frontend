import { Outlet } from "react-router"

import MainNavigation from "../components/ui/MainNavigation"
import { ModalProvider } from "../components/ui/Modal"

function RootLayout() {
  return (
    <ModalProvider>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </ModalProvider>
  )
}

export default RootLayout
