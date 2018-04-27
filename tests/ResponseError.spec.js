import ResponseError from '../src/ResponseError'

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

    const error = new ResponseError(response)
    expect(error.message).toEqual(expectedErrorMessage)
    expect(error.response.status).toEqual(400)
    expect(error.response.statusText).toEqual('Bad request')
  })

  it('should parse a JSON text response into an object', () => {
    const errorMessage = 'Something went wrong'

    const response = {
      url: '/foo',
      status: 400,
      statusText: 'Bad request',
      body: `{"message": "${errorMessage}"}`
    }

    const error = new ResponseError(response)
    expect(error.responseBody.message).toEqual(errorMessage)
  })

  it('should capture stack trace', () => {
    const spy = jest.spyOn(Error, 'captureStackTrace')

    const response = {
      url: '/foo',
      status: 400,
      statusText: 'Bad request'
    }

    const error = new ResponseError(response)
    expect(spy).toHaveBeenCalledWith(error, ResponseError)
  })
})
