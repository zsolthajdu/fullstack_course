import React from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'

const BlogList = (props) => {
  let blogs = props.blogs

  const rows = () => blogs.map(blog => {
    const pagelink = 'blogs/' + blog.id

    return (
      <tr key={blog.id} >
        <td>
          <a href={pagelink}>{blog.title}</a>
        </td>
        <td>
          by {blog.author}
        </td>
      </tr>
    )})

  return (
    <Table striped>
      <tbody>
        { rows() }
      </tbody>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  //addVote,
  //createSetMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( BlogList)
