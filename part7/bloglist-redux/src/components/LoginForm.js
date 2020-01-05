import React from 'react'
import { connect } from 'react-redux'
import { useField, FieldInput } from '../hooks'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createSetError } from '../reducers/errorReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { createSetUser } from '../reducers/userReducer'

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
      props.createSetUser(user)
      username.reset()
      password.reset()
      blogService
        .getAll()
        .then(initialBlogs => props.initializeBlogs( initialBlogs))
    } catch (exception) {
      props.createSetError('Wrong credentials', 5 )
    }
  }

  return (
    <form onSubmit={handleLogin}>

        username
      <FieldInput {...username} />

        password
      <FieldInput {...password} />

      <button type="submit">login</button>
    </form>
  )
}

const mapDispatchToProps = {
  initializeBlogs,
  createSetUser,
  createSetError
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm )
