import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'

const BlogForm = ({ reloadBlogs }) => {
  //Form-only related state is kept locally here, instead of redux store
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

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
    dispatch(createNewBlog(newBlog))

    setTitle('')
    setAuthor('')
    setUrl('')
    //Obs! Reset form fields
    event.target.reset()

    reloadBlogs()
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="titleInput"
            type="text"
            name="Title"
            onChange={handleInputChange}
            placeholder="title"
          />
        </div>
        <div>
          author:
          <input
            id="authorInput"
            type="text"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          url:
          <input
            id="urlInput"
            type="text"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <button id="blogSubmitButton" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
