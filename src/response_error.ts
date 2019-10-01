const getErrorMessage = (response: Response): string => {
  return `The request to ${response.url} failed with HTTP ${response.status}: ${
    response.statusText
    }`
}

export class ResponseError extends Error {
  public response: Response

  constructor(response: Response) {
    super(getErrorMessage(response))

    this.response = response

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ResponseError)
    }
  }
}
