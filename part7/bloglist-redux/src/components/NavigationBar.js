import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { createSetNotification } from '../reducers/notificationReducer'
import { createSetUser } from '../reducers/userReducer'
import { clearBlogs } from '../reducers/blogReducer'

const NavigationBar = ( props ) => {

  const doLogout = () => {
    window.localStorage.removeItem( 'loggedBlogappUser' )

    props.createSetUser( null )
    props.clearBlogs()
    props.createSetNotification( 'User logged out successfully.', 5 )
  }

  const padding = { padding: 5 }

  if( props.user === null )
    return (
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/' >Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/users' >Users</Link>
            </Nav.Link>
            <LoginForm />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  else {
    return (
      <Navbar collapseOnSelect expand="lg" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/' >Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/users' >Users</Link>
            </Nav.Link>
            <Navbar.Text>
              <b>{ props.user.name}</b> logged in <button onClick={ () => doLogout()}>logout</button>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state ) => {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, { createSetNotification, createSetUser, clearBlogs } )( NavigationBar )
