// @flow

import ResponseError from './ResponseError'

function DeliveryGuy() {}

DeliveryGuy.interceptors = {
  start: [],
  end: []
}

DeliveryGuy.intercept = (interceptor: string, action: () => mixed) => {
  if (DeliveryGuy.interceptors[interceptor]) {
    DeliveryGuy.interceptors[interceptor].push(action)
  }
}

DeliveryGuy.callInterceptorActions = (
  interceptor: string,
  input: string | Request,
  payload?: RequestOptions | Response
) => {
  const actions = DeliveryGuy.interceptors[interceptor] || []

  if (actions.length > 0) {
    for (const action of actions) {
      action(input, payload)
    }
  }
}

const checkResponse = function(response: Response) {
  if (!response.ok) {
    throw new ResponseError(response)
  }
}

const deliver = async function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  let promise = Promise.resolve()

  promise = promise.then(() => {
    DeliveryGuy.callInterceptorActions('start', input, init)
  })

  promise = promise.then((): Promise<Response> => fetch(input, init))

  promise = promise.then((response: Response): Response => {
    DeliveryGuy.callInterceptorActions('end', input, response)

    return response
  })

  const response = await promise

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

export { DeliveryGuy, deliver, deliverJson }
