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

describe ('API tests', () => {
  test('blog identifier property is named as\"id\"', async () => {
    const blog = await Blog.findOne({})

    //document -> schema -> path names -> _id object -> _id path name
    const blogPathName = blog.schema.paths._id.path.toString()
    expect(blogPathName).toBe('_id')
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('new blog post is added to the database', async () => {
    const newBlog = {
      title: 'Askeettisesti ja vähällä ravinnolla',
      author: 'Arttu \"Nälkäkurki\" Kurkinen',
      url: 'https://sitajatata/jutut/askeettisesti',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAfterUpdate.map(blog => blog.title)
    expect(blogTitles).toContain('Askeettisesti ja vähällä ravinnolla')
  })

  test('if likes property is missing, defaults to 0', async () => {
    const invalidBlogPost = {
      title: 'Askeettisesti ja vähällä ravinnolla',
      author: 'Arttu \"Nälkäkurki\" Kurkinen',
      url: 'https://sitajatata/jutut/askeettisesti',
    }

    await api
      .post('/api/blogs')
      .send(invalidBlogPost)
      .expect(201) //Created
      .expect('Content-Type', /application\/json/)

    //Reassurance
    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})