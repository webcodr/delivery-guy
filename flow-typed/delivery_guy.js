declare interface DeliveryGuy {
  interceptors: {
    request: Array<string>,
    response: Array<string>,
    error: Array<string>
  };
  intercept: (interceptor: string, action: () => mixed) => void;
  callInterceptorActions: (
    interceptor: string,
    input: string | Request,
    payload?: RequestOptions | Response
  ) => void;
}
