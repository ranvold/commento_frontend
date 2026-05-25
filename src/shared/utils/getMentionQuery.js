export function getMentionQuery(value, cursorPosition) {
  const textBeforeCursor = value.slice(0, cursorPosition)

  const match = textBeforeCursor.match(
    /(?<![A-Za-z0-9_.%+-])@([A-Za-z0-9._%+-]*(?:@[A-Za-z0-9.-]*)?)$/
  )

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
