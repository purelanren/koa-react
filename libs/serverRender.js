export const serverActions = actions => target => Object.assign(target, { serverActions: actions })

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
  return Promise.all(allActions.map(action => dispatch(action())))
}
