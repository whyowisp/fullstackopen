import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'

import { updateLikesOfBlog, addCommentToBlog } from '../reducers/blogReducer'

/*
const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = { comment: event.target.comment.value }

    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      comments: blog.comments.concat(newComment),
    }

    dispatch(addCommentToBlog(updatedBlog, blog.id))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="comment"></input>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}*/

const BlogView = () => {
  const dispatch = useDispatch()

  //useLocation() enables getting data passed trough <Link>
  const location = useLocation()
  const id = location.state
  const blogs = useSelector((state) => state.blogs)
  const currentBlog = blogs.find((blog) => blog.id === id)

  const handleLikeClick = (event) => {
    event.preventDefault()
    const blogToUpdate = {
      user: currentBlog.user.id, //Note to self: user is a id in blog data structure
      likes: currentBlog.likes,
      author: currentBlog.author,
      title: currentBlog.title,
      url: currentBlog.url,
    }
    dispatch(updateLikesOfBlog(blogToUpdate, id))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = { comment: event.target.comment.value }

    const updatedBlog = {
      ...currentBlog,
      user: currentBlog.user.id,
      comments: currentBlog.comments.concat(newComment),
    }

    dispatch(addCommentToBlog(updatedBlog, currentBlog.id))
  }
  console.log('BLog view reloaded')
  return (
    <div>
      <Notification />
      <h2>
        {currentBlog.title} by {currentBlog.author}
      </h2>
      <a href={currentBlog.url}>{currentBlog.url}</a> <br></br>
      {currentBlog.likes} likes{' '}
      <button id="likeBlogButton" onClick={handleLikeClick}>
        like
      </button>{' '}
      <br></br>
      added by {currentBlog.user.username}
      <h3>Comments</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="comment"></input>
          <button type="submit">add comment</button>
        </form>
      </div>
      <ul>
        {currentBlog.comments.map((n) => (
          <li key={n._id}>{n.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
