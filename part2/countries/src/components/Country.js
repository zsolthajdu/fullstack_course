import React from 'react'

const Country = (props) => {
  return (
    <li key={ props.name }>{props.name }
          <button onClick={ () => props.handleClick( props.name )} >show</button>
    </li>
  )
}

export default Country
