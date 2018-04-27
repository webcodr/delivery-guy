import ResponseError from './ResponseError'

export const deliver = async (url, options) => {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new ResponseError(response)
  }

  return response.json()
}
