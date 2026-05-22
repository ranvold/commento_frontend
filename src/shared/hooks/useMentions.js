import { useEffect, useRef, useState } from "react"

import { getMentionQuery } from "@/shared/utils/getMentionQuery"
import { useDebounce } from "@/shared/hooks/useDebounce"
import { useUsersQuery } from "@/features/users/queries/useUsersQuery"

export function useMentions({ value, onChange }) {
  const containerRef = useRef(null)
  const textareaRef = useRef(null)

  const [mention, setMention] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const mentionQuery = mention?.query ?? ""
  const debouncedQuery = useDebounce(mentionQuery)
  const hasMention = mention !== null
  const requestQuery =
    hasMention && mentionQuery.length === 0 ? "" : debouncedQuery
  const isDebouncing =
    hasMention && mentionQuery.length > 0 && debouncedQuery !== mentionQuery

  const usersQuery = useUsersQuery(requestQuery, hasMention)

  const users = isDebouncing
    ? []
    : Array.isArray(usersQuery.data)
      ? usersQuery.data
      : (usersQuery.data?.data ?? [])

  const isLoading =
    hasMention &&
    (isDebouncing || usersQuery.isLoading || usersQuery.isFetching)

  useEffect(() => {
    if (!hasMention) return

    function handlePointerDown(event) {
      const container = containerRef.current

      if (!container || !(event.target instanceof Node)) return

      if (container.contains(event.target)) return

      setMention(null)
      setActiveIndex(0)
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [hasMention])

  function handleChange(event) {
    const newValue = event.target.value
    const cursorPosition = event.target.selectionStart

    onChange(newValue)

    const currentMention = getMentionQuery(newValue, cursorPosition)

    setMention(currentMention)
    setActiveIndex(0)
  }

  function closeMentions() {
    setMention(null)
    setActiveIndex(0)
  }

  function selectUser(user) {
    if (!mention) return

    const before = value.slice(0, mention.start)
    const after = value.slice(mention.end)

    const nextValue = before + `@${user.username} ` + after

    onChange(nextValue)

    closeMentions()

    requestAnimationFrame(() => {
      const textarea = textareaRef.current

      if (!textarea) return

      const cursor = before.length + user.username.length + 2

      textarea.focus()
      textarea.setSelectionRange(cursor, cursor)
    })
  }

  function handleKeyDown(event) {
    if (!mention) return

    if (event.key === "Escape") {
      closeMentions()

      return
    }

    if (!users.length) return

    if (event.key === "ArrowDown") {
      event.preventDefault()

      setActiveIndex((prev) => (prev === users.length - 1 ? 0 : prev + 1))
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()

      setActiveIndex((prev) => (prev === 0 ? users.length - 1 : prev - 1))
    }

    if (event.key === "Enter") {
      event.preventDefault()

      selectUser(users[activeIndex])
    }
  }

  function handleSuggestionHover(index) {
    setActiveIndex(index)
  }

  return {
    containerRef,
    textareaRef,
    mention,
    suggestions: users,
    isLoading,
    isOpen: hasMention,
    activeIndex,
    handleChange,
    handleKeyDown,
    handleSuggestionHover,
    selectUser,
    closeMentions,
  }
}
