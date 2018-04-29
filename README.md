# Delivery Guy

[![Build Status](https://travis-ci.org/WebCodr/delivery-guy.svg?branch=master)](https://travis-ci.org/WebCodr/delivery-guy)
[![Coverage Status](https://coveralls.io/repos/github/WebCodr/delivery-guy/badge.svg?branch=master)](https://coveralls.io/github/WebCodr/delivery-guy?branch=master)
[![npm version](https://badge.fury.io/js/delivery-guy.svg)](https://badge.fury.io/js/delivery-guy)

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
    console.log('Response Body'. e.responseBody)
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
    console.log('Response Body'. e.responseBody)
  }
}
~~~
