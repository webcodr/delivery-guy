import { ResponseError } from './response_error'
import { Interceptors, Options} from './types/delivery_guy'

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
    this.interceptors[interceptor].push(action)
  }

  public async get(url: string): Promise<Response> {
    return this.request(url)
  }

  public async post(url: string, payload: string | object): Promise<Response> {
    return this.request(url, payload, { method: 'POST' })
  }

  public async put(url: string, payload: string | object): Promise<Response> {
    return this.request(url, payload, { method: 'PUT' })
  }

  public async patch(url: string, payload: string | object): Promise<Response> {
    return this.request(url, payload, { method: 'PATCH' })
  }

  public async delete(url: string): Promise<Response> {
    return this.request(url, undefined, { method: 'DELETE' })
  }

  public async head(url: string): Promise<Response> {
    return this.request(url, undefined, { method: 'HEAD' })
  }

  public async options(url: string): Promise<Response> {
    return this.request(url, undefined, { method: 'OPTIONS' })
  }

  private callInterceptorActions(interceptor: string, url: string, payload: RequestInit | Response) {
    const actions = this.interceptors[interceptor] || []

    if (actions.length > 0) {
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
    const headers = globalOptions.headers || {}
    let body: any

    if (payload && typeof payload === 'object') {
      body = JSON.stringify(payload)
      headers['content-type'] = 'application/json'
    } else {
      body = payload
    }

    return {
      ...globalOptions,
      ...userConfig,
      body,
      headers
    }
  }

  private async request(url: string, payload?: string | object, userConfig?: RequestInit) {
    const config = this.createConfig(payload, userConfig)
    const promise = this.createInterceptorPromise(url, config)
    const response = await promise

    this.checkResponse(url, response)

    const responseText = await response.text()

    try {
      return JSON.parse(responseText)

    } catch(exception) {
      return responseText
    }
  }
}

const getInstance = () => {
  return new DeliveryGuy()
}

export default getInstance()
