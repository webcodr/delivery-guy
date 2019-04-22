/* tslint:disable */

import { Response } from 'node-fetch'
import { ResponseError } from '../../src/response_error'

describe('ResponseError', () => {
  it('should create an error message', () => {
    const response = {
      url: '/foo',
      status: 400,
      statusText: 'Bad request'
    }

    const expectedErrorMessage = `The request to ${
      response.url
    } failed with HTTP ${response.status}: ${response.statusText}`

    // @ts-ignore
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

    // @ts-ignore
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

      // @ts-ignore
      const error = new ResponseError(response)
      expect(spy).toHaveBeenCalledWith(error, ResponseError)
    })
  })
})
