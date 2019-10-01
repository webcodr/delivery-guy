export type Options = {
  headers: {}
}

export type Interceptors = {
  request: Function[],
  response: Function[],
  error: Function[]
}
