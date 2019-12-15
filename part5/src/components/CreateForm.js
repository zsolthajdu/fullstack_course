import React, { useState } from 'react'

const CreateForm = (props) => {

  const [newURL, setNewURL ] = useState('') 
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor ] = useState('') 


  const handleUrlChange = (event) => {
    setNewURL(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('createForm: calling parent..')
    props.handleCreate( newURL, newTitle, newAuthor )
    setNewURL('')
    setNewTitle('')
    setNewAuthor('')
  }

  return (
    <div>
    <h2>Create new</h2>
    <form onSubmit= {addBlog} >
      <div>
        Title : <input  value={newTitle } onChange={handleTitleChange} />
      </div>
      <div>
        Author : <input  value={newAuthor } onChange={handleAuthorChange} />
      </div>
      <div>
        Url : <input  value={newURL } onChange={handleUrlChange} />
      </div>
      <button type="submit">Create</button>
    </form>
    </div>

  )

}

export default CreateForm
