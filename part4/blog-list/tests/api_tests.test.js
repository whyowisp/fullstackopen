const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./api_tests_helper')

const api = supertest(app)

beforeEach(async () => {
  //Clear old test data
  await Blog.deleteMany({})

  //Array of initial blogs mapped as mongoose Blog objects
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  //Array consisting promises returned from each mongoose save
  const promiseArray = blogObjects.map(blog => blog.save())
  //Paraller execution of promises
  await Promise.all(promiseArray)
})

describe ('API GET tests', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})