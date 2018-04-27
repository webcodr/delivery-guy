# Delivery Guy

[![CircleCI](https://circleci.com/gh/WebCodr/delivery-guy.svg?style=svg)](https://circleci.com/gh/WebCodr/delivery-guy)
[![Build Status](https://travis-ci.org/WebCodr/delivery-guy.svg?branch=master)](https://travis-ci.org/WebCodr/delivery-guy)

A simple Fetch API wrapper for HTTP error handling

## Things you need to know

- The parameters of `deliver()` and `deliverJson()` are identical to `fetch()` and will be passed to it.

- HTTP errors will throw a `ResponseError` error that allows you to access the response object of `fetch()` with `.response` and the response body with `.body`, which will parse JSON if it's present.

## Example

~~~ javascript
import { deliver, deliverJson } from 'delivery-guy'

let items = []
let itemsText = null

// Return parsed JSON directly
const getItemsJson = async () => {
  try {
    items = await deliverJson('/api/items')
  } catch (e) {
    console.error(e.message)
    console.log('HTTP Status', e.response.status)
    console.log('Response Body'. e.body)
  }
}

// Return Fetch API response object
const getItemsText = async () => {
  try {
    const response = await deliver('/api/items')
    itemsText = await response.text()
  } catch (e) {
    console.error(e.message)
    console.log('HTTP Status', e.response.status)
    console.log('Response Body'. e.body)
  }
}
~~~
