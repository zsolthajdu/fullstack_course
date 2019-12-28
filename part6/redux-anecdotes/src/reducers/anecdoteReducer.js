
import AnecdotesService from '../services/Anecdotes'

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch( action.type ) {
    case 'CREATE':
      return [...state, action.data]

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

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnec = await AnecdotesService.createAnecdote( content )
    dispatch({
      type: 'CREATE',
      data: newAnec
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const anec = await AnecdotesService.addVote( anecdote )
    dispatch({
      type:'ADD_VOTE',
      data: anecdote.id
    })
  }
}

export default reducer