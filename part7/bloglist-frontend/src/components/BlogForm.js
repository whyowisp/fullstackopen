import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'

const BlogForm = ({ reloadBlogs }) => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    dispatch(
      createNewBlog({
        title,
        author,
        url,
      })
    )

    //Reset form fields
    event.target.reset()

    reloadBlogs()
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id="titleInput" type="text" name="title" placeholder="title" />
        </div>
        <div>
          author:
          <input
            id="authorInput"
            type="text"
            name="author"
            placeholder="author"
          />
        </div>
        <div>
          url:
          <input id="urlInput" type="text" name="url" placeholder="url" />
        </div>
        <button id="blogSubmitButton" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
