import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <button onClick={ props.handleClick }>
      {props.text }
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState( Array(6).fill(0) )
  const [largestIndex, setLI] = useState(0)
  const [largestVotes, setLV ] = useState(0)

  const pickLine = () => {
    setSelected( Math.floor( Math.random() * 6 ) )
  }

  const voteLine = () => {
    const votesCopy = [...votes]
    votesCopy[ selected ] += 1
    setVotes( votesCopy )
    if( votesCopy[ selected ] > largestVotes ) {
      setLV( votesCopy[ selected ] )
      setLI( selected )
    }
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
      </div>
      <div>
        Has { votes[ selected ] } votes.
      </div>
      <div>
        <Button text="Vote" handleClick={ () => voteLine() } />
        <Button text="Next anecdote" handleClick={ () => pickLine() } />
      </div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[ largestIndex ]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
