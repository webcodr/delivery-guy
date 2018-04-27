import { deliver } from '../src/DeliveryGuy'
import fetchMock from 'fetch-mock'
import flushPromises from 'flush-promises'

describe('DevliveryGuy', () => {
  describe('deliver()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      const response = await deliver('/foo')
      flushPromises()

      expect(response).toEqual(mockData)
    })

    describe('errors', () => {
      it('throws an exception with JSON error response on a HTTP status error code', async () => {
        const errorMessage = 'THE PIZZA IS COLD, I WILL NOT PAY FOR THIS!'
        const httpStatusCode = 400

        fetchMock.get('/foo', {
          body: { message: errorMessage },
          status: httpStatusCode
        })

        try {
          await deliver('/foo')
          flushPromises()
        } catch (e) {
          expect(e.body.message).toEqual(errorMessage)
          expect(e.body.userMessage).toBe(undefined)
          expect(e.response.status).toEqual(httpStatusCode)
        }
      })

      it('throws an exception with text error response on a HTTP status error code', async () => {
        const errorMessage = 'THE PIZZA IS COLD, I WILL NOT PAY FOR THIS!'
        const httpStatusCode = 400

        fetchMock.get('/foo', {
          body: errorMessage,
          status: httpStatusCode
        })

        try {
          await deliver('/foo')
          flushPromises()
        } catch (e) {
          expect(e.body).toEqual(errorMessage)
          expect(e.response.status).toEqual(httpStatusCode)
        }
      })
    })

    afterEach(() => {
      fetchMock.restore()
    })
  })
})
