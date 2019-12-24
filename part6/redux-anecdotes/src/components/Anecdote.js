import React from 'react'

const Anecdote = ({ anecdote, handleClick} ) => {

  return (
    <div >
      <div>
        {anecdote.content}
      </div>
      <div>
        has { anecdote.votes} votes
        <button onClick={ () => handleClick(anecdote.id) }>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
