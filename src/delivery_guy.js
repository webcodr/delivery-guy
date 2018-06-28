// @flow

import merge from 'deepmerge'
import DeliveryGuy from './core/instance'
import ResponseError from './response_error'
import { getOption } from './core/config'
import {
  createInterceptorPromise,
  callInterceptorActions
} from './core/interceptors'

const checkResponse = function(input: string | Request, response: Response) {
  if (!response.ok) {
    callInterceptorActions('error', input, response)
    throw new ResponseError(response)
  }
}

const deliver = async function(
  input: string | Request,
  options?: RequestOptions = {}
): Promise<Response> {
  const init: RequestOptions = merge.all([
    options,
    getOption('globalRequestOptions')
  ])

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

  const init: RequestOptions = merge.all([options, defaultOptions])
  const response = await deliver(input, init)

  return response.json()
}

export { DeliveryGuy, deliver, deliverJson, deliverPostJson }
