const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.likes ? blog : blog.likes = 0

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
  //the error handling is now executed by express-async-errors library
})

module.exports = blogsRouter