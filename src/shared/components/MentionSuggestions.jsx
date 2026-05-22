function MentionSuggestions({
  suggestions,
  activeIndex,
  isLoading,
  onHover,
  onSelect,
}) {
  return (
    <div className="absolute left-0 top-full z-10 mt-1 w-64 rounded border bg-white shadow">
      {isLoading && <div className="p-2 text-sm">Loading...</div>}

      {!isLoading && suggestions.length === 0 && (
        <div className="p-2 text-sm">No users found</div>
      )}

      {!isLoading && suggestions.length > 0 && (
        <ul>
          {suggestions.map((user, index) => (
            <li key={user.id}>
              <button
                type="button"
                onMouseEnter={() => onHover(index)}
                onClick={() => onSelect(user)}
                className={`block w-full px-3 py-2 text-left hover:bg-gray-100 ${
                  activeIndex === index ? "bg-gray-100" : ""
                }`}
              >
                @{user.username}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MentionSuggestions
