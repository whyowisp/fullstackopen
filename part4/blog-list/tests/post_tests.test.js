/* eslint-disable no-useless-escape */
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/api_tests_helper')
const jwt = require ('jsonwebtoken')

const api = supertest(app)

describe('POST tests', () => {
  beforeEach(async () => {
    //Clear all blogs and users
    await Blog.deleteMany({})
    await User.deleteMany({})

    //Create 2 users
    const passwordHash = await bcrypt.hash('salainen', 10)

    const newUser = new User({
      username: 'jokunen',
      name: 'Jaska Jokunen',
      passwordHash
    })
    await newUser.save()

    const anotherPasswordHash = await bcrypt.hash('toinensalainen', 10)

    const wrongUser = new User({
      username: 'mikänen',
      name: 'Miisa Mikänen',
      anotherPasswordHash
    })
    await wrongUser.save()
  })

  test('new blog post is added to the database', async () => {
    //Login and get the token
    const user = {
      username: 'jokunen',
      password: 'salainen'
    }
    const userFromDb = await User.findOne(user)

    const userForToken = {
      username: userFromDb.username,
      id: userFromDb.id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    //Create new blog and post with login token
    const newBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Content-type', 'application/json')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(1)

    const blogTitles = blogsAfterUpdate.map(blog => blog.title)
    expect(blogTitles).toContain('React patterns')
  })

  test('new blog post as unauthorized user returns 401', async () => {
    const user = {
      username: 'jokunen',
      password: 'salainen'
    }
    const userFromDb = await User.findOne(user)

    const userForToken = {
      username: userFromDb.username,
      id: userFromDb.id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    //Create new blog and post with login token
    const newBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Content-type', 'application/json')
      //Missing authorization token
      .set('Authorization', '')
      .send(newBlog)
      .expect(401)

    //Should have 0 length
    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate).toHaveLength(0)
  })
})
afterAll(() => {
  mongoose.connection.close()
})