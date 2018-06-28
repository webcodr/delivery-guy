// @flow

const options = {}

const initConfig = (instance: DeliveryGuy) => {
  instance.getOption = (option: string): mixed => {
    return options[option] || null
  }

  instance.setOption = (option: string, value: mixed) => {
    options[option] = value
  }
}

export { initConfig }
