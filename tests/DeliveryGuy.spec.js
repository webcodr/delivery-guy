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

  afterEach(() => {
    fetchMock.restore()
  })
})
