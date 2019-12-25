import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'

//import {createAnecdote} from './reducers/anecdoteReducer'
import { createSetMessage } from './reducers/messageReducer'

const reducer = combineReducers( {
  anecdotes: anecdoteReducer,
  message: messageReducer
} )

const store = createStore( reducer)
console.log(store.getState())
store.dispatch( createSetMessage('All reducers have been initialized'))

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)