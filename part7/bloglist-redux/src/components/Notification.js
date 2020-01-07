import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ notification }) => {
  if (notification === '') {
    return null
  }

  return (
    <Alert variant="success">
      {notification}
    </Alert>
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

