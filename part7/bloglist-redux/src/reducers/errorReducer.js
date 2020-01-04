
const errorReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_ERROR':
    return action.error
  default:
    return state
  }
}

export const createSetError = (error,timeout) => {
  return dispatch => {
    dispatch( {
      type: 'SET_ERROR',
      error,
    })
    setTimeout(() => {
      dispatch( {
        type: 'SET_ERROR',
        error:'',
      })
    }, timeout*1000 )
  }
}

export default errorReducer