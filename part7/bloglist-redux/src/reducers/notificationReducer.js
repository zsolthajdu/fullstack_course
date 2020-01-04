
const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const createSetNotification = (notification,timeout) => {
  return dispatch => {
    dispatch( {
      type: 'SET_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch( {
        type: 'SET_NOTIFICATION',
        notification:'',
      })
    }, timeout*1000 )
  }
}

export default notificationReducer