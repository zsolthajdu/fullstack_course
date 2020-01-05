import UserListService from '../services/users'

const reducer = (state = [], action) => {

  switch( action.type ) {
  case 'GET_USERLIST':
    return action.data

  default:
    return state
  }
}

export const getUserList = () => {
  return async dispatch => {
    const users = await UserListService.getAllUsers()
    dispatch({
      type: 'GET_USERLIST',
      data: users,
    })
  }
}

export default reducer
