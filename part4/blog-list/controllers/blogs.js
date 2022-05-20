const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  //Verification of the request.token (extracted by tokenExtractor middleware)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  //We need user object at the end of post function
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    response.status(400).end()
    return
  }
  body.likes ? body : body.likes = 0

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

  //user.blogs is an array of blog id:s. New blog id needs to be added there, of course.
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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