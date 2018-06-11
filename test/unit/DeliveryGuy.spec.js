import {
  DeliveryGuy,
  deliver,
  deliverJson,
  deliverPostJson
} from '../../src/DeliveryGuy'
import fetchMock from 'fetch-mock'
import flushPromises from 'flush-promises'

describe('DevliveryGuy', () => {
  describe('deliver()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      const response = await deliver('/foo')
      const jsonBody = await response.json()
      flushPromises()

      expect(jsonBody).toEqual(mockData)
    })

    describe('errors', () => {
      it('throws an error on HTTP 400 with JSON string in body', done => {
        const errorMessage = 'THE PIZZA IS COLD, I WILL NOT PAY FOR THIS!'

        fetchMock.get('/foo', {
          body: { message: errorMessage },
          status: 400
        })

        deliver('/foo').catch(e => {
          expect(typeof e).toEqual('object')
          expect(typeof e.responseBody).toEqual('object')
          expect(e.responseBody.message).toEqual(errorMessage)
          done()
        })
      })
    })
  })

  describe('deliverPostJson()', () => {
    it('delivers a JSON response from a POST request', async () => {
      const url = '/foo'
      const mockData = { foo: 'bar' }
      const postData = { bar: 'foo' }

      fetchMock.post((input, init) => {
        return (
          input === url &&
          init.body === JSON.stringify(postData) &&
          init.headers['content-type'] === 'application/json'
        )
      }, mockData)

      const jsonBody = await deliverPostJson(url, postData)

      expect(jsonBody).toEqual(mockData)
    })

    it('does not override method POST', async () => {
      const url = '/foo'
      const userAgent = 'Mozilla/4.0 MDN Example'
      const postData = { bar: 'foo' }
      const mockData = { foo: 'bar' }

      fetchMock.post((input, init) => {
        return (
          input === url &&
          init.body === JSON.stringify(postData) &&
          init.headers['content-type'] === 'application/json' &&
          init.headers['user-agent'] === userAgent
        )
      }, mockData)

      const jsonBody = await deliverPostJson(url, postData, {
        method: 'GET',
        headers: { 'user-agent': userAgent }
      })

      expect(jsonBody).toEqual(mockData)
    })
  })

  describe('deliverJson()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      const jsonBody = await deliverJson('/foo')
      flushPromises()

      expect(jsonBody).toEqual(mockData)
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

      const jsonBody = await deliverJson(url)

      expect(jsonBody).toEqual(mockData)
      expect(requestInterceptor.mock.calls.length).toBe(1)
      expect(responseInterceptor.mock.calls.length).toBe(1)
      expect(requestInterceptor.mock.calls[0][0]).toBe(url)
      expect(responseInterceptor.mock.calls[0][0]).toBe(url)
    })

    it('should call error interceptors', done => {
      const url = '/foo'
      const errorInterceptor = jest.fn()
      DeliveryGuy.intercept('error', errorInterceptor)

      fetchMock.get('/foo', {
        body: { message: 'foo' },
        status: 400
      })

      expect(errorInterceptor.mock.calls.length).toBe(0)

      deliver('/foo').catch(e => {
        expect(errorInterceptor.mock.calls.length).toBe(1)
        expect(errorInterceptor.mock.calls[0][0]).toBe(url)
        done()
      })
    })

    it('should not call unknown interceptors', async () => {
      const startInterceptor = jest.fn()
      DeliveryGuy.intercept('foo', startInterceptor)
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      expect(startInterceptor.mock.calls.length).toBe(0)

      await deliverJson('/foo')

      expect(startInterceptor.mock.calls.length).toBe(0)
    })

    it('should fallback to empty array on unknown interceptor', async () => {
      DeliveryGuy.callInterceptorActions('foo', 'bar')
    })
  })

  afterEach(() => {
    fetchMock.restore()
  })
})
