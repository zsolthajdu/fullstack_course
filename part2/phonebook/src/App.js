import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState('')
  const [ error, setError] = useState('')

  useEffect( () => {
    personService
      .getAll()
      .then( initialPersons => setPersons(initialPersons))
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

    let newExist = persons.find( (elem) => { return elem.name === newName } )
    if( undefined === newExist ) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personService
        .create( personObject )
        .then( data => {
          setMessage( `Person '${newName}' was added successfully.'`)
          setTimeout(() => {
            setMessage( '' )
          }, 5000)          
          setPersons( persons.concat( personObject))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError( `Error adding  '${newName.name}' !!'`)
          setTimeout(() => {
            setError('')
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
    else if( window.confirm( `${newName} is already added to phonebook. Would you like to replace the old number with the new one ?` ) ) {
      const updatedPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .update( newExist.id, updatedPerson )
        .then( updatedGuy => {
          setPersons(  persons.map( person => person.id !== newExist.id ? person : updatedGuy ) )
          setMessage( `Person '${newName}' was updated successfully.'`)
          setTimeout(() => {
            setMessage( '' )
          }, 5000)            
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setError( `Error updating  '${newName}' !!'`)
          setTimeout(() => {
            setError('')
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = ( pID ) => {
    let delPer = persons.find( (person) => {return person.id===pID})
    if( window.confirm( `Delete ${delPer.name} ?` ) )
    personService
    .deletePerson(pID )
    .then( data => {
        //console.log( data )
        let remain = [] 
        remain = persons.filter( (person) => {
          return person.id !== pID
        })
        setPersons( remain )
        setMessage( `Person '${newName}' was deleted successfully.'`)
        setTimeout(() => {
          setMessage( '' )
        }, 5000)          
    } )
    .catch(error => {
      setError( `Person '${delPer.name}' was already removed from the server'`)
      setTimeout(() => {
        setError('')
      }, 5000)
      setPersons( persons.filter(pers => pers.id !== pID ) )
    })
  }

  return (
    <div>
      <Notification message={message} />
      <Error message={error} />
      <Filter filter={ newFilter } handleChange={ (e) => handleFilterChange(e) } />
      <h1>Phonebook</h1>
      <PersonForm handleAdd={addPerson} name={newName} handleNameChange={ (e) => handleNameChange(e) } 
                number={newNumber} handleNumberChange={ (e) => handleNumberChange(e) } />
      <h2>Numbers</h2>
      <Persons persons= { persons } filter={newFilter} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App
