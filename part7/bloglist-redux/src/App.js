import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Error from './components/Error'
import NavigationBar from './components/NavigationBar'
import UserList from './components/UserList'
import blogService from './services/blogs'
import BlogPage from './components/BlogPage'
import { initializeBlogs } from './reducers/blogReducer'
import { getUserList } from './reducers/userListReducer'
import UserBlogList from './components/UserBlogList'
import { createSetUser } from './reducers/userReducer'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'


const App = ( props ) => {

  useEffect(() => {
    props.getUserList()
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
      <Router>
        <div>
          <div>
            <NavigationBar />
          </div>
          <Notification />
          <Error />
          <h1>Blogs</h1>
          <Togglable buttonLabel='add blog'>
            <CreateForm />
          </Togglable>

          <Route exact path='/' render={ () => <BlogList />} />
          <Route exact path='/users' render={ () => <UserList />} />
          <Route exact path='/users/:id' render={ ({ match }) => <UserBlogList id={match.params.id} />} />
          <Route exact path='/blogs/:id' render={ ({ match }) => <BlogPage id={match.params.id} /> } />
        </div>
      </Router>

    </div>
  )
}

export default connect( null, { initializeBlogs, createSetUser, getUserList } )(App)
