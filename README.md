# Delivery Guy

[![CircleCI](https://circleci.com/gh/WebCodr/delivery-guy.svg?style=svg)](https://circleci.com/gh/WebCodr/delivery-guy)
[![Build Status](https://travis-ci.org/WebCodr/delivery-guy.svg?branch=master)](https://travis-ci.org/WebCodr/delivery-guy)

A simple Fetch API wrapper for HTTP error handling

## Things you need to know

- Delivery Guy assumes you're using a JSON based API (for now).

- The parameters of `deliver()` are identical to `fetch()` and will be passed to it.

- HTTP errors will throw a `ResponseError` error that allows you to access the response object of `fetch()` with `.response` and the response body with `.body` (assumes the response in JSON, if it's not, you will get the raw response body)

## Example

~~~ javascript
import { deliver } from 'delivery-guy'

let items = []

const getItems = async () => {
  try {
    items = await deliver('/api/items')
  } catch (e) {
    console.error(e.message)
    console.log('HTTP Status', e.response.status)
    console.log('Response Body'. e.body)
  }
}
~~~
