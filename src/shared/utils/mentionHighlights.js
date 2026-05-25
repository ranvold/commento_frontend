const mentionPattern = /(^|\s)(@[a-zA-Z0-9_]+)/g

const mentionClassNames = {
  self: "rounded-md bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900 ring-1 ring-inset ring-amber-200",
  other:
    "rounded-md bg-sky-100 px-1.5 py-0.5 font-medium text-sky-800 ring-1 ring-inset ring-sky-200",
}

const usernameBadgeClassNames = {
  self: "inline-flex rounded-md bg-amber-100 px-2 py-0.5 font-semibold text-amber-900 ring-1 ring-inset ring-amber-200",
  info: "inline-flex rounded-md bg-sky-100 px-2 py-0.5 font-semibold text-sky-800 ring-1 ring-inset ring-sky-200",
  alert:
    "inline-flex rounded-md bg-rose-100 px-2 py-0.5 font-semibold text-rose-800 ring-1 ring-inset ring-rose-200",
}

export function getMentionSegments(text) {
  if (!text) {
    return []
  }

  const segments = []
  let lastIndex = 0
  let match

  mentionPattern.lastIndex = 0

  while ((match = mentionPattern.exec(text)) !== null) {
    const [, prefix, mention] = match
    const mentionStart = match.index + prefix.length

    if (mentionStart > lastIndex) {
      segments.push({
        type: "text",
        value: text.slice(lastIndex, mentionStart),
        key: `text-${lastIndex}`,
      })
    }

    segments.push({
      type: "mention",
      value: mention,
      key: `mention-${mentionStart}`,
    })

    lastIndex = mentionStart + mention.length
  }

  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      value: text.slice(lastIndex),
      key: `text-${lastIndex}`,
    })
  }

  return segments.length > 0
    ? segments
    : [
        {
          type: "text",
          value: text,
          key: "text-0",
        },
      ]
}

export function getMentionClassName(mention, currentUsername) {
  const username = mention.startsWith("@") ? mention.slice(1) : mention

  if (username === currentUsername) {
    return mentionClassNames.self
  }

  return mentionClassNames.other
}

export function getUsernameBadgeClassName(tone = "info") {
  return usernameBadgeClassNames[tone] || usernameBadgeClassNames.info
}
