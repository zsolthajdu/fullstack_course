import React from 'react'
import PropTypes from 'prop-types'
import { useField, FieldInput } from '../hooks'

const CreateForm = (props) => {

  const URL = useField('text')
  const title = useField('text')
  const author = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    props.handleCreate( URL.value, title.value, author.value )
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

CreateForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default CreateForm
