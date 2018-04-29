// @flow

const getResponseBody = function(response: Response): ?ReadableStream {
  try {
    if (typeof response.body === 'string') {
      return JSON.parse(response.body)
    } else {
      return response.body
    }
  } catch (e) {
    return response.body
  }
}

const getErrorMessage = function(response: Response): string {
  return `The request to ${response.url} failed with HTTP ${response.status}: ${
    response.statusText
  }`
}

export default class ResponseError extends Error {
  response: Response
  responseBody: ?ReadableStream

  constructor(response: Response) {
    super(getErrorMessage(response))

    this.response = response
    this.responseBody = getResponseBody(response)

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ResponseError)
    }
  }
}
