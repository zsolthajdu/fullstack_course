
import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}


const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises }
    </p>    
  )
}


const Content = ( {parts }) => {
  const rows = () => parts.map( part =>
    <Part
      key={part.id}
      name={ part.name }
      exercises = { part.exercises }
    />)

  const total = parts.reduce( ( sum, current ) => {  return sum + current.exercises } , 0 )

  return (
    <div>
      { rows() }
      <h3>Total of { total } exercises.</h3>
    </div>
  )
}


const Course = ({ course }) => {
  return (
    <div>
    <Header title={ course.name } />
    <Content parts={ course.parts } />
    </div>
  )
}

export default Course