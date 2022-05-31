import { useState, forwardRef, useImperativeHandle } from "react"

const Blog = forwardRef(({ blog }, refs) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  console.log("Blog is visible: " + visible)

  return (
    <div>
      <div style={{ ...blogStyle, ...hideWhenVisible }}>
        <b>{blog.title}</b> - {blog.author}
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={{ ...blogStyle, ...showWhenVisible }}>
        <b>{blog.title}</b> - {blog.author}
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes} <button>Like</button>
        </p>
        <button onClick={toggleVisibility}>Close</button>
      </div>
    </div>
  )
})

export default Blog
