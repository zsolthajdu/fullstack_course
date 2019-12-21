import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useField, FieldInput } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const username = useField( 'text' )
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON ) {
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        'username': username.value,
        'password': password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs))
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      title={blog.title}
      author={blog.author}
      url={blog.url}
      likes={blog.likes}
      adder={blog.user.name}
    />
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <FieldInput {...username} />
      </div>
      <div>
        password
        <FieldInput {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  )

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
        loginForm() :
        <div>
          <p><b>{user.name}</b> logged in <button onClick={ () => doLogout()}>logout</button></p>

          <Togglable buttonLabel='add blog'>
            <CreateForm handleCreate={ addBlog } />
          </Togglable>
        </div>
      }

      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App
