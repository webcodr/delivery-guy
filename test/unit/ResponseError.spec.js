import ResponseError from '../../src/ResponseError'
import { Response } from 'node-fetch'

describe('ResponseError', () => {
  it('should create an error message', () => {
    const response = new Response(undefined, {
      url: '/foo',
      status: 400,
      statusText: 'Bad request'
    })

    const expectedErrorMessage = `The request to ${
      response.url
    } failed with HTTP ${response.status}: ${response.statusText}`

    const error = new ResponseError(response)
    expect(error.message).toEqual(expectedErrorMessage)
    expect(error.response.status).toEqual(400)
    expect(error.response.statusText).toEqual('Bad request')
  })

  it('should parse a JSON response text response into an object', async () => {
    const errorMessage = 'Something went wrong'

    const response = new Response(`{"message": "${errorMessage}"}`, {
      status: 400,
      statusText: 'Bad request'
    })

    const error = new ResponseError(response)
    const body = await error.response.json()
    expect(body.message).toEqual(errorMessage)
  })

  describe('Error.captureStackTrace (V8-only feature)', () => {
    it('should capture the stack trace', () => {
      const spy = jest.spyOn(Error, 'captureStackTrace')

      const response = {
        url: '/foo',
        status: 400,
        statusText: 'Bad request'
      }

      const error = new ResponseError(response)
      expect(spy).toHaveBeenCalledWith(error, ResponseError)
    })

    it('should not the capture stack trace', () => {
      delete Error.captureStackTrace

      const response = {
        url: '/foo',
        status: 400,
        statusText: 'Bad request'
      }

      /* eslint-disable no-new */
      new ResponseError(response)
    })
  })
})
