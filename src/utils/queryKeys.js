export const commentKeys = {
  all: ["comments"],
  page: (page, query = "") => [...commentKeys.all, page, query],
}
