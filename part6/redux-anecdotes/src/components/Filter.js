import React from 'react'
import { connect } from 'react-redux'
import { createSetFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.createSetFilter( event.target.value )
  }
  const style = {
    marginBottom: 10,
    marginTop:10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.filter
  }
}

const mapDispatchToProps = {
  createSetFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
