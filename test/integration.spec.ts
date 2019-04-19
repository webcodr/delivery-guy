import * as DeliveryGuy from '../dist/main'
import * as fetchMock from 'fetch-mock'
import * as flushPromises from 'flush-promises'

describe('DevliveryGuy', () => {
  describe('get()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      // @ts-ignore
      const response = await DeliveryGuy.get('/foo')
      const jsonBody = await response.json()
      flushPromises()

      expect(jsonBody).toEqual(mockData)
    })
  })

  afterEach(() => {
    fetchMock.restore()
  })
})
