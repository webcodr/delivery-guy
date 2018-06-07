import { DeliveryGuy, deliver, deliverJson } from '../../src/DeliveryGuy'
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
      const startInterceptor = jest.fn()
      const endInterceptor = jest.fn()
      DeliveryGuy.intercept('start', startInterceptor)
      DeliveryGuy.intercept('end', endInterceptor)
      const mockData = { foo: 'bar' }

      fetchMock.get(url, mockData)

      expect(startInterceptor.mock.calls.length).toBe(0)
      expect(endInterceptor.mock.calls.length).toBe(0)

      const jsonBody = await deliverJson(url)

      expect(jsonBody).toEqual(mockData)
      expect(startInterceptor.mock.calls.length).toBe(1)
      expect(endInterceptor.mock.calls.length).toBe(1)
      expect(startInterceptor.mock.calls[0][0]).toBe(url)
      expect(endInterceptor.mock.calls[0][0]).toBe(url)
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
