class ApiError extends Error {
  constructor(status, data) {
    super(data?.message || "An unexpected API error occurred.")

    this.status = status
    this.data = data
  }
}

export default ApiError
