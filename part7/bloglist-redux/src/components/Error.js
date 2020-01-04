import React from 'react'
import { connect } from 'react-redux'

const errStyle = {
  color: 'red',
  fontStyle: 'italic',
  fontSize: 16,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Error = ({ error }) => {
  if (error === '') {
    return null
  }

  return (
    <div style={errStyle} >
      {error}
    </div>
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
