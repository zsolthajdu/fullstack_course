
import React from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'

const BlogPage = ( props ) => {
  if( props.blog === undefined )
    return null

  let blog = props.blog

  const comments = () => blog.comments.map( comment =>
    <li key={comment.id} >
      {comment.text}
    </li>
  )

  return (
    <div>
      <h2>{ blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url} >{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button>Like</button>
      </div>
      <div>
      Added by {blog.user.name}
      </div>

      <div>
        <h3>Comments</h3>
        <CommentForm id={blog.id}/>
        <ul>
          {comments()}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps ) => {
  const blog = state.blogs.find( u => u.id === ownProps.id )
  return {
    blog: blog
  }
}

export default connect(
  mapStateToProps,
  null
)( BlogPage)
