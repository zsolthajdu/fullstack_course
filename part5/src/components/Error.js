import React from 'react'

const errStyle = {
  color: 'red',
  fontStyle: 'italic',
  fontSize: 16,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Error = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div style={errStyle} >
      {message}
    </div>
  )
}

export default Error