import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { createSetNotification } from '../reducers/notificationReducer'
import { createSetUser } from '../reducers/userReducer'
import { clearBlogs } from '../reducers/blogReducer'

const NavigationBar = ( props ) => {

  const doLogout = () => {
    window.localStorage.removeItem( 'loggedBlogappUser' )

    props.createSetUser( null )
    props.clearBlogs()
    props.createSetNotification( 'User logged out successfully.', 5 )
  }

  const padding = { padding: 5 }

  if( props.user === null )
    return (
      <div>
        <Link style={padding} to='/' >Blogs</Link>
        <Link style={padding} to='/users' >Users</Link>
        <LoginForm />
      </div>
    )
  else {
    return (
      <div>
        <Link style={padding} to='/' >Blogs</Link>
        <Link style={padding} to='/users' >Users</Link>
        <b>{ props.user.name}</b> logged in <button onClick={ () => doLogout()}>logout</button>
      </div>
    )
  }
}

const mapStateToProps = (state ) => {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, { createSetNotification, createSetUser, clearBlogs } )( NavigationBar )
