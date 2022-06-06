import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleInputChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    createNewBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
    //Obs! Reset form fields
    event.target.reset()
  }

  return (
    <div className='formDiv'>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            type="text"
            name="Title"
            onChange={handleInputChange}
            placeholder='title'
          />
        </div>
        <div>
        author:
          <input
            type="text"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>
        url:
          <input
            type="text"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
