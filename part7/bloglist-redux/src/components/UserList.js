
import React from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'

const UserList = ( props ) => {
  let users = props.users

  const rows = () => users.map( user => {
    let userlink = 'users/' + user.id
    return (
      <tr key={user.id}>
        <td><a href={userlink} >{user.name}</a></td>
        <td>{user.blogs.length}</td>
        <td></td>
      </tr>
    )
  }
  )

  return (
    <div>
      <h3>Users</h3>

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          { rows() }
        </tbody>
      </Table>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)( UserList)
