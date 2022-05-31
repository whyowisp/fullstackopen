import blogService from "../services/blogs"
import { useState } from "react"

const CreateBlogForm = ({ loadBlogs, setMessage, setMessageType }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    await blogService
      .createNew(newBlog)
      .then((response) => {
        console.log(response)
        setMessageType("ok")
        setMessage(`${title} from author ${author} created successfully`)
      })
      .catch((error) => {
        console.log("creating new object failed: " + error.response.data)
        setMessageType("error")
        setMessage("Creating new blog failed")
      })

    setTitle("")
    setAuthor("")
    setUrl("")
    loadBlogs()
  }

  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlogForm