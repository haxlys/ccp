export function convertToString(params) {
  if (params !== null && typeof params === "object") {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&")
  }

  return ""
}
