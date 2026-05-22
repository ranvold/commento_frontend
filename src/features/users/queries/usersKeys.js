export const usersKeys = {
  all: ["users"],
  list: (query = "") => [...usersKeys.all, "list", query],
}
