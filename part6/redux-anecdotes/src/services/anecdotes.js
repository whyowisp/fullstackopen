import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upvoteExisting = async (object) => {
  console.log(object)
  const updatedObject = {
    content: object.content,
    id: object.id,
    votes: object.votes + 1
  }
  console.log(updatedObject)
  const response = await axios.put(`${baseUrl}/${object.id}`, updatedObject)
  return response.data
}

export default { getAll, createNew, upvoteExisting }