// tslint:disable-next-line
import * as fetchMock from 'fetch-mock'
import * as DeliveryGuy from '../dist/main'

describe('DevliveryGuy', () => {
  describe('get()', () => {
    it('delivers a JSON response', async () => {
      const mockData = { foo: 'bar' }

      fetchMock.get('/foo', mockData)

      // @ts-ignore
      const jsonBody = await DeliveryGuy.get('/foo')

      expect(jsonBody).toEqual(mockData)
    })
  })

  describe('post()', () => {
    it('delivers a JSON response', async () => {
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

  afterEach(() => {
    fetchMock.restore()
  })
})
