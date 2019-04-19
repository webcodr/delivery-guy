import DeliveryGuy from '../../src/delivery_guy'
import * as fetchMock from 'fetch-mock'
import * as flushPromises from 'flush-promises'

describe('DeliveryGuy', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('get()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      const response = await DeliveryGuy.get('/foo')
      const jsonBody = await response.json()
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

      const response = await DeliveryGuy.get(url)

      expect(await response.json()).toEqual(mockData)
      expect(requestInterceptor.mock.calls.length).toBe(1)
      expect(responseInterceptor.mock.calls.length).toBe(1)
      expect(requestInterceptor.mock.calls[0][0]).toBe(url)
      expect(responseInterceptor.mock.calls[0][0]).toBe(url)
    })
  })
})
