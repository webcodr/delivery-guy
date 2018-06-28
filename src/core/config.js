// @flow

const options = {
  globalRequestOptions: {}
}

const getOption = (option: string): {} | string | number | null => {
  return options[option] || null
}

const setOption = (option: string, value: mixed) => {
  options[option] = value
}

const initConfig = (instance: DeliveryGuy) => {
  instance.getOption = getOption
  instance.setOption = setOption
}

export { initConfig, getOption, setOption }
