import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) => {
  let message = props.message

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

const mapStateToProps = (state) => {

  return {
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)
