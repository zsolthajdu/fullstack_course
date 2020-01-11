import React, { useState } from 'react'

const SetBorn = (props) => {

  const [ author, setAuthor] = useState('')
  const [ born, setBorn] = useState(0)

  if (!props.show) {
    return null
  }

  const setBirth = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { author, born }
    })

    setAuthor('')
    setBorn( 0 )
  }

  const rows = () => props.result.data.allAuthors.map( a => {
    return ( 
      <option key={a.name} value={a.name}>{a.name}</option>
    )
  })

  const handleAuthorChange = ( e ) => {
    setAuthor( e.target.value )
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={setBirth}>
        <div>
          <label>
            Select the author
            <select onChange={handleAuthorChange}>
              {rows()}
            </select>
          </label>
        </div>
        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn( Number(target.value ) ) }
          />
        </div>

        <button type='submit'>Update author</button>
      </form>
    </div>
  )


}

export default SetBorn
