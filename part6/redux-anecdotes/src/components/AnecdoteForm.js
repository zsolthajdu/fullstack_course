import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createSetMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async ( event ) => {
    event.preventDefault()
    const content = event.target.wisdom.value
    event.target.wisdom.value = ''
    props.createAnecdote( content )

    props.createSetMessage('Added anecdote \'' + content + '\'', 5 ) 
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

const mapDispatchToProps = {
  createSetMessage,
  createAnecdote
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
