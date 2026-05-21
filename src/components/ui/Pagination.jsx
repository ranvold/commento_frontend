function Pagination({ meta, onPageChange }) {
  return (
    <div className="mt-4 flex justify-between">
      <button
        type="button"
        onClick={() => onPageChange(meta.previous)}
        disabled={meta.page === 1}
        className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => onPageChange(meta.next)}
        disabled={meta.page === meta.pages}
        className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
