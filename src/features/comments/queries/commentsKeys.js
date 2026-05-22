export const commentsKeys = {
  all: ["comments"],
  list: (params) => [...commentsKeys.all, "list", params],
}
