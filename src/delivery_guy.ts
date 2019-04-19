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


  private async request(url: string, body?: BodyInit, userConfig?: RequestInit) {
    const headers = { ...this.globalHeaders }

    if (body && typeof body === 'object') {
      body = JSON.stringify(body)
      headers['content-type'] = 'application/json'
    }

    const config: RequestInit = {
      ...userConfig,
      body,
      headers
    }

    return this.createInterceptorPromise(url, config)
  }

  public async get(url: string): Promise<Response> {
    return this.request(url)
  }

  public async post(url: string, payload: BodyInit): Promise<Response> {
    return this.request(url, payload, { method: 'POST' })
  }

  public async put(url: string, payload: BodyInit): Promise<Response> {
    return this.request(url, payload, { method: 'PUT' })
  }

  public async patch(url: string, payload: BodyInit): Promise<Response> {
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
