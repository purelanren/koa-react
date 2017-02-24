export const serverActions = actions => target => {
  if (!Array.isArray(actions)) {
    throw new Error('actions must be array')
  }
  return Object.assign(target, { serverActions: actions })
}

export const loadOnServer = (dispatch, components) => {
  let allActions = []
  // 默认已经使用了react-redux库
  components.forEach(component => {
    if (!component ||
      !component.WrappedComponent) {
      return true
    }
    return (allActions = allActions.concat(component.WrappedComponent.serverActions))
  })
  return Promise.all(allActions.map(action => {
    if (typeof action !== 'function') {
      console.error('action must be a function')
      return Promise.resolve({})
    }
    return dispatch(action())
  }))
}
