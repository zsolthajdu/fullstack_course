import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createSetError } from '../reducers/errorReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { createSetUser } from '../reducers/userReducer'

const LoginForm = ( props ) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    try {
      const user = await loginService.login({
        'username': form.elements.username.value,
        'password': form.elements.password.value,
      })

      console.log('jelszo = ' + form.elements.password.value )

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.createSetUser(user)
      form.elements.username.value = ''
      form.elements.password.value = ''
      blogService
        .getAll()
        .then(initialBlogs => props.initializeBlogs( initialBlogs))
    } catch (exception) {
      props.createSetError('Wrong credentials', 5 )
    }
  }

  return (
    <Form inline onSubmit={handleLogin} >
      <Form.Control type="text" name="username" id='username' placeholder="Username"/>
      <Form.Control type="password" name="password" id='password' placeholder="Password"/>
      <Button type="submit" >
        Login
      </Button>
    </Form>
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
