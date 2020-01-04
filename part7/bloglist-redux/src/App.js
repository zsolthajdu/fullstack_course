import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Error from './components/Error'
import UserInfo from './components/UserInfo'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { createSetUser } from './reducers/userReducer'

const App = ( props ) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON ) {
      props.initializeBlogs()
    }
  }, [props])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.createSetUser(user)
      blogService.setToken(user.token)
    }
    else
      props.createSetUser( null)
  }, [props])

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />
      <Error />
      <UserInfo />

      <BlogList />
    </div>
  )
}

export default connect( null, { initializeBlogs, createSetUser } )(App)
