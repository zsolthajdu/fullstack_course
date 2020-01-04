import React from 'react'
import { connect } from 'react-redux'

const notStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = ({ notification }) => {
  if (notification === '') {
    return null
  }

  return (
    <div style={notStyle} >
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)

