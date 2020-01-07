import BlogsService from '../services/blogs'


const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch( action.type ) {
  case 'CREATE':
    return [...state, action.data]

  case 'ADD_VOTE':
  {
    const id = action.data
    const blog = state.find( a => a.id === id )
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    return state.map( dote =>
      dote.id !== id ? dote : newBlog
    )
  }

  case 'INIT_BLOGS':
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

export const clearBlogs = () => {
  return async dispatch => {
    dispatch({
      type: 'INIT_BLOGS',
      data: [],
    })
  }
}

export const addVote = (blog) => {
  const newBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    const updated = await BlogsService.update( blog.id, newBlog )
    dispatch({
      type:'ADD_VOTE',
      data: updated.id
    })
  }
}

export default reducer
