import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Languages from './Languages'
import Weather from './Weather'

const Details = ( props ) => {

  const [ newInfo, setNewInfo ] = useState({ languages:[] })

  useEffect( () => {
    axios
      .get( `https://restcountries.eu/rest/v2/alpha/${props.name}` )
      .then( response => {
        setNewInfo( response.data )
      })
  }, [props.name] )

  return (
    <div>
      <h2>{ newInfo.name }</h2>
      <p>Capital: {newInfo.capital}</p>
      <p>Population: {newInfo.population}</p>
      <h3>Languages</h3>
      <Languages langlist={newInfo.languages} />
      <img src={newInfo.flag} alt="The flag should show here" width="200" height="150"/>
      <Weather city={newInfo.capital} country={newInfo.alpha2Code} />
    </div>
  )
}

export default Details

