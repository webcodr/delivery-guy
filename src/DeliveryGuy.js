// @flow

import ResponseError from './ResponseError'

const makeDelivery = async function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new ResponseError(response)
  }

  return response
}

export const deliver = makeDelivery

export const deliverJson = async function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  const response = await makeDelivery(input, init)

  return response.json()
}
