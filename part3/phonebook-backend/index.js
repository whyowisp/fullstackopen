require('dotenv').config()
const { application, response } = require("express")
const express = require("express")
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

morgan.token(
  "resBody", (req, res) => {
    return JSON.stringify(req.body)
  } 
);
app.use(morgan(':resBody'))

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> ${new Date()}`
  )
})

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        response.json(persons)
      } else {
        response.status(204).end()
      }
  })
  .catch(error => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'DocumentNotFoundError') {
    return response.status(404).send({ error: 'document you tried to save was not found'})
  }
  next(error)
}
//Remember to use this as last middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT), () => {
  console.log(`Server running on port ${PORT}`)
}

