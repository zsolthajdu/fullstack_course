import React, { useState } from 'react'

const Recommendations = (props) => {
  const [ genre, setGenre] = useState( '' )

  if( !props.show ) 
    return null

  if( props.result.loading ) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks
  let genres = []
  books.forEach( b => {
    genres = genres.concat( b.genres )
  });
  genres = Array.from(new Set( genres ))

  console.log( "Current genre: " + genre )

  const getBookList = () => {
    if( genre === '' ) {
      return books.map(a => 
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )
    }
    else {
      const books2 = books.filter( b => b.genres.includes( genre ))
      return books2.map(a => 
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )
    }

  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          { getBookList() }
        </tbody>
      </table>
      <div>
        {genres.map( g => 
          <button key={g} onClick={() => setGenre( g )}>{g}</button>
        )}
      </div>
    </div>
  )
}

export default Recommendations
