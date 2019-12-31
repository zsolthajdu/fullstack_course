import BlogsService from '../services/blogs'


const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch( action.type ) {
  case 'CREATE':
    return [...state, action.data]
/*
    case 'ADD_VOTE':
      const id = action.data
      const anecdote = state.find( a => a.id === id )
      const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes+1
      }
      return state.map( dote =>
        dote.id !== id ? dote : newAnecdote
      )
*/
  case 'INIT_ANECDOTES':
    return action.data

  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await BlogsService.create( content )
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await BlogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addVote = (blog) => {
  return async dispatch => {
    const updated = await BlogsService.addVote( blog )
    dispatch({
      type:'ADD_VOTE',
      data: updated.id
    })
  }
}

export default reducer
