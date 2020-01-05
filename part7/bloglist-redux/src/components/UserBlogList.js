
import React from 'react'
import { connect } from 'react-redux'

const UserBlogList = ( props ) => {
  if( props.user === undefined )
    return null

  let user = props.user

  const rows = () => user.blogs.map( blog =>
    <li key={blog.id}>{blog.title}</li>
  )

  return (
    <div>
      <h2>{ user.name }</h2>
      <h3>added blogs</h3>
      <ul>
        { rows() }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps ) => {
  const user = state.users.find( u => u.id === ownProps.id )
  return {
    user: user
  }
}

export default connect(
  mapStateToProps,
  null
)( UserBlogList)
