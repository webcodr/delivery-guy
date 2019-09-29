# Delivery Guy

[![Build Status](https://travis-ci.org/WebCodr/delivery-guy.svg?branch=master)](https://travis-ci.org/WebCodr/delivery-guy)
[![npm version](https://badge.fury.io/js/delivery-guy.svg)](https://github.com/WebCodr/delivery-guy)

A simple Fetch API wrapper for HTTP error handling

## Version 7

DeliveryGuy 7 is a complete rewrite in TypeScript. It features a new, consistent API and features
like support for all HTTP methods and fully automated JSON handling for requests and responses.

## Examples

### GET

~~~ javascript
import DeliveryGuy from 'delivery-guy'

const items = await DeliveryGuy.get('/api/items')
console.log(items)
~~~

If `/api/items` would return JSON, DeliveryGuy will automatically parse it into an object
with `JSON.parse()`.

### POST

~~~ javascript
import DeliveryGuy from 'delivery-guy'

const response = await DeliveryGuy.post('/api/item', {id: 1, foo: 'bar'})
console.log(response)
~~~

The automatic JSON handling works for payloads as well. If DeliveryGuy receives an object as payload
it will automatically use `JSON.stringify()` on the object and set the content type to
`application/json`.

### Other HTTP methods

~~~ javascript
import DeliveryGuy from 'delivery-guy'

await DeliveryGuy.put('/api/item', {id: 1, foo: 'bar'})
await DeliveryGuy.patch('/api/item', {id: 1, foo: 'bar'})
await DeliveryGuy.delete('/api/items')
await DeliveryGuy.head('/api/items')
await DeliveryGuy.options('/api/items')
~~~

### Options

All Fetch API options are supported.

~~~ javascript
import DeliveryGuy from 'delivery-guy'

const items = await DeliveryGuy.get('/api/items', { headers: {'user-agent': 'Mozilla 5.0/Foo Bar'} })
console.log(items)
~~~

### Global options

Global options will be applied to all requests. As as with per-request options, all Fetch API options
are supported.

~~~ javascript
import DeliveryGuy from 'delivery-guy'

DeliveryGuy.addGlobalOption('headers', {'user-agent': 'Mozilla 5.0/Foo Bar'})
~~~

### Interceptors

You can define global interceptors for requests, responses and errors. Multiple interceptors per
type are supported. Callback functions will be injected with the Fetch API input (URLs mostly) and
the payload.

~~~ javascript
import DeliveryGuy from 'delivery-guy'

DeliveryGuy.intercept('request', (url, payload) => {
  console.log(url, payload)
})

DeliveryGuy.intercept('response', (url, payload) => {
  console.log(url, payload)
})

DeliveryGuy.intercept('error', (url, payload) => {
  console.log(url, payload)
})
~~~
