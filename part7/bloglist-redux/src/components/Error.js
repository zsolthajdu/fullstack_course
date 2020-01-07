import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'


const Error = ({ error }) => {
  if (error === '') {
    return null
  }

  return (
    <Alert variant="danger">
      {error}
    </Alert>
  )
}

const mapStateToProps = (state) => {

  return {
    error: state.error
  }
}

export default connect(
  mapStateToProps,
  null
)(Error)
