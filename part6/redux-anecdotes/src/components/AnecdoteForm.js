import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {

  const addAnecdote = ( event ) => {
    event.preventDefault()
    const content = event.target.wisdom.value
    props.store.dispatch( createAnecdote( content))
    event.target.wisdom.value = ''
  }

  return (
    <div>
     <h2>create new</h2>
     <form onSubmit={addAnecdote} >
       <div><input name="wisdom" /></div>
       <button type='submit'>create</button>
     </form>    
    </div>
  )
}

export default AnecdoteForm
