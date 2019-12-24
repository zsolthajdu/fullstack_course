import React from 'react'
import Anecdote from '../components/Anecdote'
import { addVote  } from '../reducers/anecdoteReducer';

const AnecdoteList = (props) => {
  let anecdotes = props.store.getState()
  anecdotes.sort( (a,b) => {
    if( a.votes > b.votes )
      return -1
    else if ( a.votes < b.votes )
      return 1
    return 0
  })

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(addVote( id ))
  }

  return (
    <div>
      { anecdotes.map( anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={ vote} />
      )}
    </div>
  )
}

export default AnecdoteList
