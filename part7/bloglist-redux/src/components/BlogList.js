import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = (props) => {
  let blogs = props.blogs

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      title={blog.title}
      author={blog.author}
      url={blog.url}
      id={blog.id}
    />
  )

  return (
    <ul>
      { rows() }
    </ul>
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
