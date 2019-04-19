class DeliveryGuy {
  private globalHeaders: object = {}

  private interceptors = {
    request: [],
    response: [],
    error: []
  }

  public addGlobalHeader(name: string, value: string) {
    this.globalHeaders[name] = value
  }

  public reset() {
    this.globalHeaders = {}
    this.interceptors = {
      request: [],
      response: [],
      error: []
    }
  }

  public intercept(interceptor: string, action: Function) {
    this.interceptors[interceptor].push(action)
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
      throw new Error()
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
    const headers = { ...this.globalHeaders }
    let body = null

    if (payload && typeof payload === 'object') {
      body = JSON.stringify(payload)
      headers['content-type'] = 'application/json'
    } else {
      body = payload
    }

    return {
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
    return this.request(url, null, { method: 'DELETE' })
  }

  public async head(url: string): Promise<Response> {
    return this.request(url, null, { method: 'HEAD' })
  }

  public async options(url: string): Promise<Response> {
    return this.request(url, null, { method: 'OPTIONS' })
  }
}

const getInstance = () => {
  return new DeliveryGuy()
}

export default getInstance()
