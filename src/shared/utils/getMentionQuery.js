export function getMentionQuery(value, cursorPosition) {
  const textBeforeCursor = value.slice(0, cursorPosition)

  const match = textBeforeCursor.match(/(?:^|\s)@([a-zA-Z0-9_]*)$/)

  if (!match) {
    return null
  }

  const query = match[1]

  const start = cursorPosition - query.length - 1

  return {
    query,
    start,
    end: cursorPosition,
  }
}
