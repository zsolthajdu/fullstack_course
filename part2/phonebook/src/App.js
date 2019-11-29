import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect( () => {
    axios
      .get( 'http://localhost:3001/persons')
      .then( response => {
          setPersons( response.data )  
      })
  }, [] )

  const handleNameChange = (event) => {
    setNewName( event.target.value )
  }

  const handleNumberChange = (event) => {
    setNewNumber( event.target.value )
  }

  const handleFilterChange = (event) => {
    setNewFilter( event.target.value )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if( undefined === persons.find( (elem) => { return elem.name === newName } ) ) {
      setPersons( persons.concat( personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      window.alert( `${newName} is already added to phonebook.` )
    }
  }

  return (
    <div>
      <Filter filter={ newFilter } handleChange={ (e) => handleFilterChange(e) } />
      <h2>Phonebook</h2>
      <PersonForm handleAdd={addPerson} name={newName} handleNameChange={ (e) => handleNameChange(e) } 
                number={newNumber} handleNumberChange={ (e) => handleNumberChange(e) } />
      <h2>Numbers</h2>
      <Persons persons= { persons } filter={newFilter} />
    </div>
  )
}

export default App
