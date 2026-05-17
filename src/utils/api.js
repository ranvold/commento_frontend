const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export function buildApiUrl(path) {
  return new URL(path, apiBaseUrl).toString()
}
