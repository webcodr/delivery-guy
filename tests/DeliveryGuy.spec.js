import { deliver, deliverJson } from '../src/DeliveryGuy'
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
      it('throws an error on HTTP 400', async () => {
        const errorMessage = 'THE PIZZA IS COLD, I WILL NOT PAY FOR THIS!'

        fetchMock.get('/foo', {
          body: { message: errorMessage },
          status: 400
        })

        try {
          await deliver('/foo')
          flushPromises()
        } catch (e) {
          expect(e.responseBody.message).toEqual(errorMessage)
        }
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

  afterEach(() => {
    fetchMock.restore()
  })
})
