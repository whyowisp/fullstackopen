/* eslint-disable no-useless-escape */
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/api_tests_helper')

const api = supertest(app)

describe('GET tests', () => {

  beforeEach(async () => {
    //Clear old test data
    await Blog.deleteMany({})

    /*
    //Array of initial blogs mapped as mongoose Blog objects
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    //Array consisting promises returned from each mongoose save
    const promiseArray = blogObjects.map(blog => blog.save())
    //Paraller execution of promises
    await Promise.all(promiseArray)*/
  })

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
})



describe('DELETE tests', () => {
  test('deletion of a blog', async () => {
    const blogId = await helper.getId()
    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(204)
  })
})

describe('PUT tests', () => {
  test('blog post property \'likes\' is updated', async () => {
    const blogId = '5a422a851b54a676234d17f7'
    const updateObject = { likes: 23 }

    await api
      .put(`/api/blogs/${blogId}`)
      .send(updateObject)
      .expect(200) //Ok

    const blogAfterUpdate = await Blog.findById('5a422a851b54a676234d17f7')
    expect(blogAfterUpdate.likes).toBe(23)
  })
})


//tests for users api
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jokunen',
      name: 'Jaska Jokunen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user created with too short password returns 400', async () => {
    const shortPasswordUser = {
      username: 'jokunen',
      name: 'Jaska Jokunen',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(shortPasswordUser)
      .expect(400)
  })

  test('user created with too short username returns 400', async () => {
    const shortUsernameUser = {
      username: 'jj',
      name: 'Jaska Jokunen',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(shortUsernameUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})