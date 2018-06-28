declare interface DeliveryGuy {
  getOption: (option: string) => {} | string | number | null;
  setOption: (option: string, value: mixed) => void;
  addRequestOption: (option: string, value: mixed) => void;
  removeRequestOption: (option: string) => void;
  intercept: (interceptor: string, action: () => mixed) => void;
}
