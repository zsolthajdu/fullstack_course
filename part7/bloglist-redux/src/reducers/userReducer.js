
const reducer = (state = [], action) => {

  switch( action.type ) {
  case 'SET_USER':
    return action.user
  default:
    return state

  }
}

export const createSetUser = ( user ) => {
  return dispatch => {
    dispatch( {
      type: 'SET_USER',
      user,
    })
  }
}

export default reducer
