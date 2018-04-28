// @flow

export default class ResponseError extends Error {
  response: Response
  responseBody: ReadableStream | string | null | void

  constructor(response: Response) {
    super(
      `The request to ${response.url} failed with HTTP ${response.status}: ${
        response.statusText
      }`
    )

    this.response = response

    try {
      if (typeof response.body === 'string') {
        this.responseBody = JSON.parse(response.body)
      } else {
        this.responseBody = response.body
      }
    } catch (e) {
      this.responseBody = response.body
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError)
    }
  }
}
