import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createSetError } from '../reducers/errorReducer'
import { createBlog } from '../reducers/blogReducer'

const CreateForm = (props) => {

  const addBlog = (event) => {
    event.preventDefault()
    const form = event.target
    try{
      props.createBlog( {
        'url': form.elements.URL.value,
        'title':form.elements.title.value,
        'author':form.elements.author.value
      } )

    } catch (exception) {
      props.createSetError('Adding new blog FAILED !!', 5 )
    }
    form.elements.title.value = ''
    form.elements.author.value = ''
    form.elements.URL.value = ''
  }

  return (
    <div>
      <h2>Create new</h2>

      <Form onSubmit={addBlog} >
        <Form.Group>
          <Form.Label>Title :</Form.Label>
          <Form.Control type="text" id='title' name="title"/>

          <Form.Label>Author :</Form.Label>
          <Form.Control type="text" id='author' name="author"/>

          <Form.Label>Url :</Form.Label>
          <Form.Control type="text" id='URL' name="URL"/>

          <Button variant="primary" id='addBlog' type="submit" >
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  createSetError
}

export default connect(
  null,
  mapDispatchToProps
)(CreateForm)
