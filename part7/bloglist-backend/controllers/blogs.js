const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  //request.user defined by userExtractor() -middleware
  //After this point user is already verified
  const user = request.user

  if (!body.title || !body.url) {
    response.status(400).end()
    return
  }
  body.likes ? body : (body.likes = 0)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    comments: body.comments,
    url: body.url,
    likes: body.likes,
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
  const user = request.user //User is verified already by middleware
  const blog = await Blog.findById(toBeDeletedId)

  //Check if blog exists
  if (!blog) {
    return response.status(400).end() //Bad request
  }
  //Check that user is owner of that blog
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(403).end() //Forbidden
  }

  //Remove blog from blogs db
  await Blog.findByIdAndRemove(toBeDeletedId)
  response.status(204)

  //Remove blog from user at users db
  //return array of blog id objects not including blog id object which was deleted
  user.blogs = user.blogs.filter(
    (blog) => blog._id.toString() !== toBeDeletedId
  )
  await user.save()
  response.status(204).end()
})

//Clear db
blogsRouter.delete('/', async () => {
  await Blog.deleteMany({})
})

blogsRouter.post('/:id/comments', async (request, response) => {
  console.log('call comments: ' + request.params.id + ' ' + request.body)
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  )
  response.status(200).json(updatedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  console.log('call likes: ' + request.params.id + ' ' + request.body)
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true } //an updated object is returned
  )
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
