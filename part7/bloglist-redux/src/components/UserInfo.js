import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import CreateForm from './CreateForm'
import { createSetNotification } from '../reducers/notificationReducer'
import { createSetUser } from '../reducers/userReducer'
import { clearBlogs } from '../reducers/blogReducer'

const UserInfo = ( props ) => {

  const doLogout = () => {
    window.localStorage.removeItem( 'loggedBlogappUser' )

    props.createSetUser( null )
    props.clearBlogs()
    props.createSetNotification( 'User logged out successfully.', 5 )
  }

  if( props.user === null )
    return (
      <LoginForm />
    )
  else {

    return (
      <div>
        <p><b>{ props.user.name}</b> logged in <button onClick={ () => doLogout()}>logout</button></p>

        <Togglable buttonLabel='add blog'>
          <CreateForm />
        </Togglable>
      </div>
    )
  }
}


const mapStateToProps = (state ) => {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, { createSetNotification, createSetUser, clearBlogs } )( UserInfo )
