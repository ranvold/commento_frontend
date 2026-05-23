const notificationsAllKey = ["notifications"]

export const notificationsKeys = {
  all: notificationsAllKey,
  list: (token, params) => [
    ...notificationsAllKey,
    "list",
    token ?? null,
    params,
  ],
  unreadCount: (token) => [
    ...notificationsAllKey,
    "unreadCount",
    token ?? null,
  ],
}
