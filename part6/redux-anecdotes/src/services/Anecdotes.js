import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async anecdote => {
  const newAnec = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put( baseUrl+'/'+anecdote.id, newAnec )
  return response.data
}

export default { getAll , createAnecdote, addVote }
