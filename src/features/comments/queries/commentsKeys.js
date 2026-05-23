const commentsAllKey = ["comments"]

export const commentsKeys = {
  all: commentsAllKey,
  list: (token, params) => [...commentsAllKey, "list", token ?? null, params],
}
