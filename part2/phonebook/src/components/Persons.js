import React from 'react'
import Person from './Person'

const Persons = ( props ) => {
  const rows = () => props.persons.map( (person ) => {
    if( person.name.toLowerCase().includes( props.filter.toLowerCase() ) )
      return (
        <Person
          key  = { person.name }
          name = { person.name }
          number = {person.number }
        />
        )
    else
        return undefined
    }
  )

  return (
    <div>
      { rows() }
    </div>
  )
}

export default Persons