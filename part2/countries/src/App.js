import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Details from './components/Details'
import axios from 'axios'

function App() {

  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState( [] )
  const [ results, setResults ] = useState( [] )

  const handleFilterChange = (event) => {
    setNewFilter( event.target.value )

    let res = countries;
    if( event.target.value !== '' ) {
      res = countries.filter( ( country ) => {
          return country.name.toLowerCase().includes( event.target.value.toLowerCase() ) 
      })

    }
    setResults( res )
  }

  useEffect( () => {
    axios
      .get( 'https://restcountries.eu/rest/v2/all' )
      .then( response => {
          setCountries( response.data )
          setResults( response.data )
      })
  }, [] )

  /**
   * Handles 'show'button next to country names in list
   * 
   * @param {string} cntry 
   */
  const handleShow = (cntry) => {
    setNewFilter( cntry )
    let res = []
    res = countries.filter( ( country ) => {
      return country.name === cntry 
    })    
    setResults( res )
  }

  if( results.length === 1 ) {
    //console.log( results[0] )
    return (
      <div>
        <Filter filter={ newFilter } handleChange={ (e) => handleFilterChange(e) } />
          <Details name={results[0].alpha3Code } />
      </div>
    );
  }
  else if( results.length > 9 ) {
    return (
      <div>
        <Filter filter={ newFilter } handleChange={ (e) => handleFilterChange(e) } />
          <p>Too many matches, specify another filter</p>
      </div>
    );
  }
  else {
    return (
      <div>
        <Filter filter={ newFilter } handleChange={ (e) => handleFilterChange(e) } />
        <Countries countries={ results } handleClick={ handleShow } />
      </div>
    );
  }
}

export default App;
