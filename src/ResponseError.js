export default class ResponseError extends Error {
  constructor(response) {
    super(
      `The request to ${response.url} failed with HTTP ${response.status}: ${
        response.statusText
      }`
    )

    this.response = response

    try {
      this.responseBody = JSON.parse(response.body)
    } catch (e) {
      this.responseBody = response.body
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError)
    }
  }
}
