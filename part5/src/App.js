import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Error from './components/Error'
//import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'  

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    />
  )
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const doLogout = () => {
    window.localStorage.removeItem( 'loggedBlogappUser' )
    setUser( null )
    setMessage( 'User logged out successfully.')
    setTimeout(() => {
      setMessage( '' )
    }, 5000)
  }


  const addBlog = ( url, title, author ) => {
    console.log( "Url = " , {url} )
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
          
          <CreateForm handleCreate={ addBlog } />
        </div>
      }

      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App 