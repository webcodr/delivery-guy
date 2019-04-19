class DeliveryGuy {
  private async request(url: string, body?: BodyInit, userConfig?: RequestInit) {
    const headers = {}

    if (body && typeof body === 'object') {
      body = JSON.stringify(body)
      headers['content-type'] = 'application/json'
    }

    const config: RequestInit = {
      ...userConfig,
      body,
      headers
    }

    return fetch(url, config)
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
