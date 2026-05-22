import { useState } from "react"

import { useMentions } from "@/shared/hooks/useMentions"
import MentionSuggestions from "@/shared/components/MentionSuggestions"

function CommentEditor({
  initialValue = "",
  submitLabel = "Submit",
  isPending = false,
  autoFocus = false,
  onCancel,
  onSubmit,
}) {
  const [body, setBody] = useState(initialValue)

  const {
    containerRef,
    textareaRef,
    suggestions,
    activeIndex,
    isOpen,
    isLoading,
    handleChange,
    handleKeyDown,
    handleSuggestionHover,
    selectUser,
  } = useMentions({
    value: body,
    onChange: setBody,
  })

  function handleSubmit(event) {
    event.preventDefault()

    const trimmed = body.trim()

    if (!trimmed) return

    onSubmit(trimmed, () => {
      if (initialValue === "") {
        setBody("")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div ref={containerRef} className="relative">
        <textarea
          id="body"
          name="body"
          ref={textareaRef}
          value={body}
          autoFocus={autoFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Write comment..."
          className="min-h-28 w-full rounded border p-3"
          required
        />

        {isOpen && (
          <MentionSuggestions
            suggestions={suggestions}
            activeIndex={activeIndex}
            isLoading={isLoading}
            onHover={handleSuggestionHover}
            onSelect={selectUser}
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default CommentEditor
