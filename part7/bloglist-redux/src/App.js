import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
//import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
//import { useField, FieldInput } from './hooks'

const App = ( props ) => {
  //const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  //const username = useField( 'text' )
  //const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON ) {
      props.initializeBlogs()
      //blogService
      //  .getAll()
      //  .then(initialBlogs => setBlogs(initialBlogs))
    }
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const doLogout = () => {
    window.localStorage.removeItem( 'loggedBlogappUser' )

    setUser( null )
    // TODO setBlogs([])
    setMessage( 'User logged out successfully.')
    setTimeout(() => {
      setMessage( '' )
    }, 5000)
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message} />
      <Error message={ error } />

      {user === null ?
        <LoginForm setError={(e) => setError(e)}  setUser={(u) => setUser(u) } /> :
        <div>
          <p><b>{user.name}</b> logged in <button onClick={ () => doLogout()}>logout</button></p>

          <Togglable buttonLabel='add blog'>
            <CreateForm />
          </Togglable>
        </div>
      }

      <BlogList />
    </div>
  )
}

export default connect(null, { initializeBlogs })(App)
