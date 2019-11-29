import React from 'react'
import Country from './Country'

const Countries = ( props ) => {
  const rows = () => props.countries.map( (country) => {
      return ( <div  key={country.name} >
        <Country name={country.name} handleClick={props.handleClick} />
      </div> )
  })

  return (
    <div>
      { rows() }
    </div>
  ) 
}

export default Countries
