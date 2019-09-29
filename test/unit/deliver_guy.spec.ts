// tslint:disable-next-line
import * as fetchMock from 'fetch-mock'
import DeliveryGuy from '../../src/delivery_guy'

describe('DeliveryGuy', () => {
  afterEach(() => {
    fetchMock.restore()
    DeliveryGuy.reset()
  })

  describe('get()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      const response = await DeliveryGuy.get('/foo')

      expect(response).toEqual(mockData)
    })

    it('delivers a text response', async () => {
      const mockData = 'Hello World!'

      fetchMock.get('/foo', mockData)

      const response = await DeliveryGuy.get('/foo')

      expect(response).toEqual(mockData)
    })
  })

  describe('post()', () => {
    it('delivers a JSON response from a POST request', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }
      const postData = { bar: 'foo' }

      fetchMock.post((input: any, init: any) => {
        return (
          input === url &&
          init.body === JSON.stringify(postData) &&
          init.headers['content-type'] === 'application/json'
        )
      }, mockData)

      const jsonBody = await DeliveryGuy.post(url, postData)

      expect(jsonBody).toEqual(mockData)
    })
  })

  describe('options', () => {
    it('does apply a header', async () => {
      const url = '/foo'
      const userAgent = 'Mozilla/5.0 FOO!'
      const mockData = { foo: 'bar' }

      fetchMock.get((input: any, init: any) => {
        return input === url && init.headers['user-agent'] === userAgent
      }, mockData)

      const response = await DeliveryGuy.get(url, { headers: { 'user-agent': userAgent } })

      expect(response).toEqual(mockData)
    })

    it('does apply credentials settings', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }

      fetchMock.get((input: any, init: any) => {
        return input === url && init.credentials === 'same-origin'
      }, mockData)

      const response = await DeliveryGuy.get(url, { credentials: 'same-origin'} )

      expect(response).toEqual(mockData)
    })
  })

  describe('global options', () => {
    it('does apply a global header', async () => {
      const url = '/foo'
      const userAgent = 'Mozilla/5.0 FOO!'
      const mockData = { foo: 'bar' }

      fetchMock.get((input: any, init: any) => {
        return input === url && init.headers['user-agent'] === userAgent
      }, mockData)

      DeliveryGuy.addGlobalOption('headers', {'user-agent': userAgent})

      const response = await DeliveryGuy.get(url)

      expect(response).toEqual(mockData)
    })

    it('does apply global credentials settings', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }

      fetchMock.get((input: any, init: any) => {
        return input === url && init.credentials === 'same-origin'
      }, mockData)

      DeliveryGuy.addGlobalOption('credentials', 'same-origin')

      const response = await DeliveryGuy.get(url)

      expect(response).toEqual(mockData)
    })
  })

  describe('interceptors', () => {
    it('should call interceptors', async () => {
      const url = '/foo'
      const requestInterceptor = jest.fn()
      const responseInterceptor = jest.fn()
      DeliveryGuy.intercept('request', requestInterceptor)
      DeliveryGuy.intercept('response', responseInterceptor)
      const mockData = { foo: 'bar' }

      fetchMock.get(url, mockData)

      expect(requestInterceptor.mock.calls.length).toBe(0)
      expect(responseInterceptor.mock.calls.length).toBe(0)

      const response = await DeliveryGuy.get(url)

      expect(response).toEqual(mockData)
      expect(requestInterceptor.mock.calls.length).toBe(1)
      expect(responseInterceptor.mock.calls.length).toBe(1)
      expect(requestInterceptor.mock.calls[0][0]).toBe(url)
      expect(responseInterceptor.mock.calls[0][0]).toBe(url)
    })
  })
})
