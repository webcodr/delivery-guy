export default class ResponseError extends Error {
  constructor(response) {
    super(
      `The request to ${response.url} failed with HTTP ${response.status}: ${
        response.statusText
      }`
    )

    this.response = response

    try {
      this.body = JSON.parse(response.body)
    } catch (e) {
      this.body = response.body
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError)
    }
  }
}
