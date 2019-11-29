import React from 'react'

const Filter = ( props => {
  return (
    <div>
        Filter: <input value={ props.filter} onChange={ props.handleChange } />
    </div>
    )
} )

export default Filter