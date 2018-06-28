// @flow

const interceptors = {
  request: [],
  response: [],
  error: []
}

const intercept = (interceptor: string, action: () => mixed) => {
  if (interceptors[interceptor]) {
    interceptors[interceptor].push(action)
  }
}

const callInterceptorActions = (
  interceptor: string,
  input: string | Request,
  payload?: RequestOptions | Response
) => {
  const actions = interceptors[interceptor] || []

  if (actions.length > 0) {
    for (const action of actions) {
      action(input, payload)
    }
  }
}

const initInterceptors = (instance: DeliveryGuy) => {
  instance.setOption('interceptors', interceptors)
  instance.intercept = intercept
  instance.callInterceptorActions = callInterceptorActions
}

const createInterceptorPromise = (
  input: string | Request,
  init?: RequestOptions
): Promise<Response> => {
  let promise = Promise.resolve()

  promise = promise.then(() => {
    callInterceptorActions('request', input, init)
  })

  promise = promise.then((): Promise<Response> => fetch(input, init))

  promise = promise.then((response: Response): Response => {
    callInterceptorActions('response', input, response)

    return response
  })

  return promise
}

export { initInterceptors, createInterceptorPromise }
