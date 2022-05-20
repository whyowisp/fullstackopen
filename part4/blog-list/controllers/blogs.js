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
  const toBeDeletedId = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const blog = await Blog.findById(toBeDeletedId)

  //Check if blog not exists OR blog user doesn´t match with user token
  if (!blog || blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(400).end()
  }

  //Remove blog from blogs db
  await Blog.findByIdAndRemove(toBeDeletedId)
  response.status(204)

  //Remove blog from user at users db
  const user = await User.findById(decodedToken.id)
  //return array of blog id objects not including blog id object which was deleted
  user.blogs = user.blogs.filter(blog => blog._id !== toBeDeletedId)
  await user.save()
  response.status(204).end()
})

//Clear db
blogsRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body , { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter