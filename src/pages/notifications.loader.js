import { checkAuthLoader } from "../utils/auth"

function notificationsLoader() {
  return checkAuthLoader()
}

export default notificationsLoader
