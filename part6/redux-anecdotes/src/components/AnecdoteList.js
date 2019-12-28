import React from 'react'
import { connect } from 'react-redux'
import Anecdote from '../components/Anecdote'
import { addVote  } from '../reducers/anecdoteReducer';
import { createSetMessage } from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  let anecdotes = props.anecdotes
  const filter = props.filter
  anecdotes.sort( (a,b) => {
    if( a.votes > b.votes )
      return -1
    else if ( a.votes < b.votes )
      return 1
    return 0
  })

  const vote = (id) => {
    //console.log('vote', id)
    const anek = anecdotes.find( an => an.id === id )
    props.addVote( anek )
    props.createSetMessage('Voted for anecdote \'' + anek.content + '\'', 5 ) 
  }

  const anecdotesToShow = anecdotes.filter( a => {   return a.content.indexOf(filter) !== -1 })

  return (
    <div>
      { anecdotesToShow.map( anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={ vote} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log( state )
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  createSetMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AnecdoteList)
