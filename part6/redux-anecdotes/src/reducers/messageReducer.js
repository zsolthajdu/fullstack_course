
const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    default:
      return state
  }
}

export const createSetMessage = (message,timeout) => {
  return dispatch => {
    dispatch( {
      type: 'SET_MESSAGE',
      message,
    })
    setTimeout(() => {
      dispatch( {
        type: 'SET_MESSAGE',
        message:'',
      })
    }, timeout*1000 )
  }
}

export default messageReducer