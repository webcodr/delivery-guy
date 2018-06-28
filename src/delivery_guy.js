// @flow

import merge from 'deepmerge'
import DeliveryGuy from './core/instance'
import ResponseError from './response_error'

DeliveryGuy.interceptors = {
  request: [],
  response: [],
  error: []
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

const checkResponse = function(input: string | Request, response: Response) {
  if (!response.ok) {
    DeliveryGuy.callInterceptorActions('error', input, response)
    throw new ResponseError(response)
  }
}

const createInterceptorPromise = function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  let promise = Promise.resolve()

  promise = promise.then(() => {
    DeliveryGuy.callInterceptorActions('request', input, init)
  })

  promise = promise.then((): Promise<Response> => fetch(input, init))

  promise = promise.then((response: Response): Response => {
    DeliveryGuy.callInterceptorActions('response', input, response)

    return response
  })

  return promise
}

const deliver = async function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  const promise = createInterceptorPromise(input, init)
  const response = await promise

  checkResponse(input, response)

  return response
}

const deliverJson = async function(
  input: string | Request,
  init?: RequestOptions
): Promise<Response> {
  const response = await deliver(input, init)

  return response.json()
}

const deliverPostJson = async function(
  input: string | Request,
  payload: BodyInit,
  options?: RequestOptions = {}
): Promise<Response> {
  const defaultOptions: RequestOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json'
    }
  }

  const init: RequestOptions = merge(options, defaultOptions)
  const response = await deliver(input, init)

  return response.json()
}

export { DeliveryGuy, deliver, deliverJson, deliverPostJson }
