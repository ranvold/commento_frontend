export function isValidationError(error) {
  return error?.status === 422
}
