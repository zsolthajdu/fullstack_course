import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={ props.handleClick }>
      {props.text }
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{ props.value }</td>
    </tr>
  )
}

const Statistics = (props) => {
  let sum = props.good + props.neutral + props.bad
  if( sum===0 )
    return(
      <p>No feedback given.</p>
    )
  else
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="Good" value={ props.good } />
            <Statistic text="Neutral" value={ props.neutral } />
            <Statistic text="Bad" value={props.bad} />
            <Statistic text="All" value={ sum } />
            <Statistic text="Average" value= { props.good-props.bad / sum} />
            <Statistic text="Positive" value= { (props.good * 100 / sum).toString() + " %"} />
          </tbody>
        </table>
      </div>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodVal = newGood => {
    setGood( newGood )
  }
  const setNeutralVal = newNeutral => {
    setNeutral( newNeutral )
  }
  const setBadVal = newBad => {
    setBad( newBad )
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" handleClick={ () => setGoodVal(good+1) } />
        <Button text="Neutral" handleClick={ () => setNeutralVal(neutral+1) } />
        <Button text="Bad" handleClick={ () => setBadVal( bad+1 ) }  />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

