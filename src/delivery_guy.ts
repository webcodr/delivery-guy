import { ResponseError } from './response_error'
import { Interceptors, Options } from './types/delivery_guy'
const deepmerge = require('deepmerge')

class DeliveryGuy {
  private readonly DEFAULT_GLOBAL_OPTIONS: Options = {
    headers: {}
  }

  private readonly DEFAULT_INTERCEPTORS: Interceptors = {
    request: [],
    response: [],
    error: []
  }

  private globalOptions: Options = {
    ...this.DEFAULT_GLOBAL_OPTIONS
  }

  private interceptors: Interceptors = {
    ...this.DEFAULT_INTERCEPTORS
  }

  public addGlobalOption(name: string, value: any) {
    this.globalOptions[name] = value
  }

  public reset() {
    this.globalOptions = {
      ...this.DEFAULT_GLOBAL_OPTIONS
    }

    this.interceptors = {
      ...this.DEFAULT_INTERCEPTORS
    }
  }

  public intercept(interceptor: string, action: Function) {
    if (this.interceptors.hasOwnProperty(interceptor)) {
      this.interceptors[interceptor].push(action)
    }
  }

  public async get(url: string, userConfig: RequestInit = {}): Promise<Response> {
    return this.request(url, undefined, userConfig)
  }

  public async post(url: string, payload: string | object, userConfig: RequestInit = {}): Promise<Response> {
    const config = {
      ...userConfig,
      method: 'POST'
    }

    return this.request(url, payload, config)
  }

  public async put(url: string, payload: string | object, userConfig: RequestInit = {}): Promise<Response> {
    const config = {
      ...userConfig,
      method: 'PUT'
    }

    return this.request(url, payload, config)
  }

  public async patch(url: string, payload: string | object, userConfig: RequestInit = {}): Promise<Response> {
    const config = {
      ...userConfig,
      method: 'PATCH'
    }

    return this.request(url, payload, config)
  }

  public async delete(url: string, userConfig: RequestInit = {}): Promise<Response> {
    const config = {
      ...userConfig,
      method: 'DELETE'
    }

    return this.request(url, undefined, config)
  }

  public async head(url: string, userConfig: RequestInit = {}): Promise<Response> {
    const config = {
      ...userConfig,
      method: 'HEAD'
    }

    return this.request(url, undefined, config)
  }

  public async options(url: string, userConfig: RequestInit = {}): Promise<Response> {
    const config = {
      ...userConfig,
      method: 'OPTIONS'
    }

    return this.request(url, undefined, config)
  }

  private callInterceptorActions(interceptor: string, url: string, payload: RequestInit | Response) {
    if (typeof this.interceptors[interceptor] === 'object'
      && this.interceptors[interceptor].length > 0) {
      const actions: Function[] = this.interceptors[interceptor]

      for (const action of actions) {
        action(url, payload)
      }
    }
  }

  private checkResponse(url: string, response: Response) {
    if (!response.ok) {
      this.callInterceptorActions('error', url, response)
      throw new ResponseError(response)
    }
  }

  private createInterceptorPromise(url: string, config: RequestInit): Promise<Response> {
    let promise: Promise<any> = Promise.resolve()

    promise = promise.then(() => {
      this.callInterceptorActions('request', url, config)
    })

    promise = promise.then((): Promise<Response> => fetch(url, config))

    promise = promise.then(
      (response: Response) => {
        this.callInterceptorActions('response', url, response)

        return response
      }
    )

    return promise
  }

  private createConfig(payload?: string | object, userConfig?: RequestInit): RequestInit {
    const globalOptions = { ...this.globalOptions }
    let body: string | object

    if (typeof payload === 'object') {
      body = JSON.stringify(payload)
      globalOptions.headers['content-type'] = 'application/json'
    } else {
      body = payload
    }

    const options = [
      globalOptions,
      userConfig,
      { body }
    ]

    return deepmerge.all(options)
  }

  private async request(url: string, payload?: string | object, userConfig?: RequestInit) {
    const config = this.createConfig(payload, userConfig)
    const promise = this.createInterceptorPromise(url, config)
    const response = await promise

    this.checkResponse(url, response)

    const responseText = await response.text()

    try {
      return JSON.parse(responseText)

    } catch (exception) {
      return responseText
    }
  }
}

const getInstance = () => {
  return new DeliveryGuy()
}

export default getInstance()
