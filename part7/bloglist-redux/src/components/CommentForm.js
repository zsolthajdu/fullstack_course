import React from 'react'
import { connect } from 'react-redux'
import { useField, FieldInput } from '../hooks'
import blogService from '../services/blogs'
import { createSetError } from '../reducers/errorReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { createSetUser } from '../reducers/userReducer'

const CommentForm = ( props ) => {
  const comment = useField( 'text' )

  const handleAdd = async (event) => {

    event.preventDefault()
    try {
      const newComment = await blogService.comment(
        props.blogId,
        {
          'comment': comment.value
        }
      )

      comment.reset()
      blogService
        .getAll()
        .then(initialBlogs => props.initializeBlogs( initialBlogs))
    } catch (exception) {
      props.createSetError('Comment submission error', 5 )
      comment.reset()
    }
  }

  return (
    <form onSubmit={handleAdd}>
      comment
      <FieldInput {...comment} />
      <button type="submit">Add</button>
    </form>
  )
}

const mapStateToProps = (state, ownProps ) => {

  return {
    blogId: ownProps.id
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  createSetUser,
  createSetError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm )
