declare interface DeliveryGuy {
  getOption: (option: string) => mixed;
  setOption: (option: string, value: mixed) => void;
  intercept: (interceptor: string, action: () => mixed) => void;
  callInterceptorActions: (
    interceptor: string,
    input: string | Request,
    payload?: RequestOptions | Response
  ) => void;
}
