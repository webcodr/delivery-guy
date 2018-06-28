// @flow

const options = {
  globalRequestOptions: {}
}

const initConfig = (instance: DeliveryGuy) => {
  instance.getOption = (option: string): {} | string | number | null => {
    return options[option] || null
  }

  instance.setOption = (option: string, value: mixed) => {
    options[option] = value
  }
}

export { initConfig }
