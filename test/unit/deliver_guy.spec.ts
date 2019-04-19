import DeliveryGuy from '../../src/delivery_guy'
import * as fetchMock from 'fetch-mock'
import * as flushPromises from 'flush-promises'

describe('DeliveryGuy', () => {
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
})
