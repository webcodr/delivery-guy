declare class DeliveryGuy {
  private readonly DEFAULT_GLOBAL_OPTIONS;
  private readonly DEFAULT_INTERCEPTORS;
  private globalOptions;
  private interceptors;
  addGlobalOption(name: string, value: any): void;
  reset(): void;
  intercept(interceptor: string, action: Function): void;
  get(url: string, userConfig: RequestInit): Promise<Response>;
  post(url: string, payload: string | object, userConfig: RequestInit): Promise<Response>;
  put(url: string, payload: string | object, userConfig: RequestInit): Promise<Response>;
  patch(url: string, payload: string | object, userConfig: RequestInit): Promise<Response>;
  delete(url: string, userConfig: RequestInit): Promise<Response>;
  head(url: string, userConfig: RequestInit): Promise<Response>;
  options(url: string, userConfig: RequestInit): Promise<Response>;
  private callInterceptorActions;
  private checkResponse;
  private createInterceptorPromise;
  private createConfig;
  private request;
}

export declare class ResponseError extends Error {
  response: Response;
  constructor(response: Response);
}
