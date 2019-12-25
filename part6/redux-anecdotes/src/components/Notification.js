import React from 'react'

const Notification = ( props ) => {
  let message = props.store.getState().message

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if( message.length === 0 ) {
    return null
  }
  else {
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default Notification