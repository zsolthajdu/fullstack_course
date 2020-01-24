import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/recommendations'
import SetBorn from './components/SetBorn'
import Login from './components/Login'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author { name }
    published
    genres
    id
  }
`

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
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const GET_USER_BOOKS = gql`
{
  me {
    username
    favoriteGenre
  }
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

const ADD_BOOK = gql`
  mutation createBook( $title: String!, $author: String!, $published:Int!, $genres: [String!]! ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState( localStorage.getItem( 'library-user-token' ) )
  //const [user, setUser] = useState( null )

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000 )
  }

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if( !includedIn(dataInStore.allBooks, addedBook ) ) {
      console.log('Cache update : gots to refresh book list...')
      dataInStore.allBooks.push( addedBook )
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  useSubscription( BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log( "Added book: " + addedBook.title )
      notify(`${addedBook.title} added`)
      updateCacheWith( addedBook )
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  const NavMenu = () => {
    if( token ) // When a user is logged in
      return(
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('setborn')}>set author birth</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
        </div>
      )
    else   // Menu when there is no user logged in
      return(
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        </div>
      )
  }

  return (
    <div>
      { NavMenu() }        

      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }

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
        { (addBook) =>
          <NewBook
            show={page === 'add'} addBook={addBook} updateCache={updateCacheWith}
          />
        }
      </Mutation>

      <Mutation mutation={SET_BORN}  refetchQueries = { [ {query: ALL_AUTHORS} ] }  >
        {(editAuthor) =>
          <Query query={ALL_AUTHORS} >
            { (result) =>
              <SetBorn 
                show={page === 'setborn' } result={result} editAuthor={editAuthor}
              />
            }
          </Query>
        }
      </Mutation>

      <ApolloConsumer>
        {(client =>
          <Query query={GET_USER_BOOKS} >
            {(result) =>
              <Recommendations show={page === 'recommend'} result={result} client={client} />
            }
          </Query>
        )}
      </ApolloConsumer>

      <Login
        show = {page === 'login' } 
        login={login}
        setToken={(token) => { 
          setToken(token) 
          setPage('authors')
          }}
      />

    </div>
  )
}

export default App