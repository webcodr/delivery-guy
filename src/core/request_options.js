// @flow

const initRequestOptions = (instance: DeliveryGuy) => {
  instance.addRequestOption = (option: string, value: mixed) => {
    let requestOptions = instance.getOption('globalRequestOptions')

    // $FlowFixMe
    requestOptions[option] = value

    instance.setOption('globalRequestOptions', requestOptions)
  }

  instance.removeRequestOption = (option: string) => {
    let requestOptions = instance.getOption('globalRequestOptions')

    // $FlowFixMe
    delete requestOptions[option]

    instance.setOption('globalRequestOptions', requestOptions)
  }
}

export { initRequestOptions }
