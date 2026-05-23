import { createConsumer } from "@rails/actioncable"

export function createCableConsumer(token) {
  const encodedToken = encodeURIComponent(token)
  return createConsumer(
    `${import.meta.env.VITE_WS_URL}/cable?token=${encodedToken}`
  )
}
