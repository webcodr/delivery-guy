import * as fetchMock from 'fetch-mock'
import * as flushPromises from 'flush-promises'
import * as DeliveryGuy from '../dist/main'

describe('DevliveryGuy', () => {
  describe('get()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      // @ts-ignore
      const jsonBody = await DeliveryGuy.get('/foo')
      flushPromises()

      expect(jsonBody).toEqual(mockData)
    })
  })

  afterEach(() => {
    fetchMock.restore()
  })
})
