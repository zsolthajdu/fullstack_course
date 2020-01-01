import React from 'react'
import { useField, FieldInput } from '../hooks'
import blogService from '../services/blogs'
import loginService from '../services/login'


const LoginForm = ( props ) => {
  const username = useField( 'text' )
  const password = useField('password')


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
      props.setUser(user)
      username.reset()
      password.reset()
      blogService
        .getAll()
        .then(initialBlogs => props.setBlogs(initialBlogs))
    } catch (exception) {
      props.setError('Wrong credentials')
      setTimeout(() => {
        props.setError('')
      }, 5000)
    }
  }

  return (
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
}

export default LoginForm
