import ResponseError from './ResponseError'

const makeDelivery = async (url, options) => {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new ResponseError(response)
  }

  return response
}

export const deliver = makeDelivery

export const deliverJson = async (url, options) => {
  const response = await makeDelivery(url, options)

  return response.json()
}
