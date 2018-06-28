import { initConfig } from './config'
import { initInterceptors } from './interceptors'

function DeliveryGuy() {}

initConfig(DeliveryGuy)
initInterceptors(DeliveryGuy)

export default DeliveryGuy
