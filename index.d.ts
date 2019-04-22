declare class DeliveryGuy {
  private readonly DEFAULT_GLOBAL_OPTIONS;
  private readonly DEFAULT_INTERCEPTORS;
  private globalOptions;
  private interceptors;
  addGlobalOption(name: string, value: any): void;
  reset(): void;
  intercept(interceptor: string, action: Function): void;
  private callInterceptorActions;
  private checkResponse;
  private createInterceptorPromise;
  private createConfig;
  private request;
  get(url: string): Promise<Response>;
  post(url: string, payload: string | object): Promise<Response>;
  put(url: string, payload: string | object): Promise<Response>;
  patch(url: string, payload: string | object): Promise<Response>;
  delete(url: string): Promise<Response>;
  head(url: string): Promise<Response>;
  options(url: string): Promise<Response>;
}

export declare class ResponseError extends Error {
  response: Response;
  constructor(response: Response);
}
