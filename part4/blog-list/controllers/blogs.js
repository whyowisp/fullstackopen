const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }

  blog.likes ? blog : blog.likes = 0

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

  //the error handling is now executed by express-async-errors library
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body , { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter