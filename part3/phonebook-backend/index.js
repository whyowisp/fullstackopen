require('dotenv').config()
const { application, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const { updateMany } = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

morgan.token('resBody', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':resBody'))


//Database use functions

app.get('/info', (request, response) => {
  Person.estimatedDocumentCount().then((dbSize) => {
    response.send(`Phonebook has info for ${dbSize} people <br> ${new Date()}`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(204).end()
      }
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.exists({ name: request.body.name }).then((result) => {
    if (result === null) {

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then((savedPerson) => {
          console.log(savedPerson + ' saved to database')
          response.json(savedPerson)
        })
        .catch((error) => next(error))

    } else {
      response.status(400).send({ error: 'Person you are trying to add exists already' })
    }
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body
  
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

//Error handling

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send(error.message)
  } else if (error.name === 'DocumentNotFoundError') {
    return response
      .status(404)
      .send({ error: 'document you tried to save was not found' })
  }
  next(error)
}

//Remember to use this as last middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT),
() => {
  console.log(`Server running on port ${PORT}`)
}
