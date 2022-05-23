const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const { requestLogger, userExtractor, errorHandler, unknownEndpoint } = require('./utils/middleware')

const app = express()

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json()) // This should be among first app.use:s. cors is ok.
app.use(requestLogger) // ...for example logger needs to be json:d

app.use('/api/blogs', userExtractor, blogsRouter) //Routers last because they use those libraries above
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler) //errors handled after everything else

module.exports = app