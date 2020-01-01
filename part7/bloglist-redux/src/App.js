import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
//import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
//import { useField, FieldInput } from './hooks'

const App = ( ) => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  //const username = useField( 'text' )
  //const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON ) {
      //props.initialBlogs()
      blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs))
    }
  },[])

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
    setBlogs([])
    setMessage( 'User logged out successfully.')
    setTimeout(() => {
      setMessage( '' )
    }, 5000)
  }

  const addBlog = ( url, title, author ) => {
    console.log( 'Url = ' , { url } )
    const blogObject = {
      title: title,
      author: author,
      url: url,
      id: blogs.length + 1,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setMessage( `Blog '${title}' by '${author}'  was added successfully.'`)
        setTimeout(() => {
          setMessage( '' )
        }, 5000)
      })
      .catch(error => {
        if( error.response.data.error )
          setMessage( error.response.data.error )
        else
        //console.log( error.response.data )
          setError( `Error adding  '${title}' !!'` )
        setTimeout(() => {
          setError('')
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message} />
      <Error message={ error } />

      {user === null ?
        <LoginForm setError={(e) => setError(e)}  setUser={(u) => setUser(u)} setBlogs={(b) => setBlogs(b)} />  :
        <div>
          <p><b>{user.name}</b> logged in <button onClick={ () => doLogout()}>logout</button></p>

          <Togglable buttonLabel='add blog'>
            <CreateForm handleCreate={ addBlog } />
          </Togglable>
        </div>
      }

      <BlogList blogs={ blogs } />
    </div>
  )
}

export default App
