import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBorn from './components/SetBorn'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
  }
}
`

const ADD_BOOK = gql`
  mutation createBook( $title: String!, $author: String!, $published:Int!, $genres: [String!]! ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

const SET_BORN = gql`
  mutation modAuthor( $author: String!, $born: Int! ) {
    editAuthor(
      name: $author,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('setborn')}>set author birth</button>
      </div>

      <ApolloConsumer>
        {(client =>
          <Query query={ALL_AUTHORS} >
            {(result) =>
              <Authors show={page === 'authors'} result={result} client={client} />
            }
          </Query>
        )}
      </ApolloConsumer>

      <ApolloConsumer>
        {(client =>
          <Query query={ALL_BOOKS} >
            {(result) =>
              <Books show={page === 'books'} result={result} client={client} />
            }
          </Query>
        )}
      </ApolloConsumer>

      <Mutation mutation={ADD_BOOK} 
        refetchQueries = { [ { query: ALL_BOOKS }, {query: ALL_AUTHORS} ] } 
      >
        {(addBook) =>
          <NewBook
            show={page === 'add'} addBook={addBook}
          />
        }
      </Mutation>

      <Mutation mutation={SET_BORN}  refetchQueries = { [ {query: ALL_AUTHORS} ] }  >
        {(editAuthor) =>
          <Query query={ALL_AUTHORS} >
            { (result) =>
              <SetBorn 
                show={page === 'setborn' } 
                result={result}
                editAuthor={editAuthor}
              />
            }
          </Query>
        }
      </Mutation>

    </div>
  )
}

export default App