import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@mui/material'
import { createNewBlog, initializeBlogs } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const currentUser = users.find((n) => n.name === user.name)

    dispatch(createNewBlog(title, author, url, currentUser))

    //Reset form fields
    event.target.reset()
    initializeBlogs()
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          <TextField
            variant="standard"
            size="small"
            label="title"
            id="titleInput"
            type="text"
            name="title"
            placeholder="title"
          />
        </div>
        <div>
          <TextField
            variant="standard"
            size="small"
            label="author"
            id="authorInput"
            type="text"
            name="author"
            placeholder="author"
          />
        </div>
        <div>
          <TextField
            variant="standard"
            size="small"
            label="url"
            id="urlInput"
            type="text"
            name="url"
            placeholder="url"
          />
        </div>
        <Button
          variant="contained"
          size="small"
          id="blogSubmitButton"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
