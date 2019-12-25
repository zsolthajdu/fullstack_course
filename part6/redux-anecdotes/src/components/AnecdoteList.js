import React from 'react'
import Anecdote from '../components/Anecdote'
import { addVote  } from '../reducers/anecdoteReducer';
import { createSetMessage } from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  let anecdotes = props.store.getState().anecdotes
  anecdotes.sort( (a,b) => {
    if( a.votes > b.votes )
      return -1
    else if ( a.votes < b.votes )
      return 1
    return 0
  })

  const vote = (id) => {
    console.log('vote', id)
    const anek = anecdotes.find( an => an.id === id )
    props.store.dispatch(addVote( id ))

    props.store.dispatch( createSetMessage('Voted for anecdote \'' + anek.content + '\'' ) )
    setTimeout(() => {
      props.store.dispatch( createSetMessage(''))
    }, 5000)
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
