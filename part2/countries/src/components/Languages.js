import React from 'react'

const Languages = ( props ) => {
    const rows = () => props.langlist.map( (language) => {
      return ( <li key={ language.name }> {language.name } </li> )
  })

  return (
    <ul>
      { rows() }
    </ul>
  ) 
}

export default Languages
