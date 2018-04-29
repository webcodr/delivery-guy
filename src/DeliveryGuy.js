// @flow

import ResponseError from './ResponseError'

const checkResponse = function(response: Response) {
  if (!response.ok) {
    throw new ResponseError(response)
  }
}

const deliver = async function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  const response = await fetch(input, init)

  checkResponse(response)

  return response
}

const deliverJson = async function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  const response = await deliver(input, init)

  return response.json()
}

export { deliver, deliverJson }
