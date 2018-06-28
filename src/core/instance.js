import { initConfig } from './config'
import { initRequestOptions } from './request_options'
import { initInterceptors } from './interceptors'

function DeliveryGuy() {}

initConfig(DeliveryGuy)
initRequestOptions(DeliveryGuy)
initInterceptors(DeliveryGuy)

export default DeliveryGuy
