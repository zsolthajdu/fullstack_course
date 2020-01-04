import React from 'react'
import { connect } from 'react-redux'
import { useField, FieldInput } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const CreateForm = (props) => {

  const URL = useField('text')
  const title = useField('text')
  const author = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    props.createBlog( { 'url':URL.value, 'title':title.value, 'author':author.value } )
    URL.reset()
    title.reset()
    author.reset()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit= {addBlog} >
        <div>
        Title : <FieldInput {...title} />
        </div>
        <div>
        Author : <FieldInput {...author}/>
        </div>
        <div>
          Url : <FieldInput {...URL} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>

  )
}

const mapDispatchToProps = {
  createBlog
}

export default connect(
  null,
  mapDispatchToProps
)(CreateForm)
