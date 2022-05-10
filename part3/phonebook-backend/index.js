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

/*let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]*/

app.get("/api/persons", (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people <br> ${new Date()}`
  )
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
  })

app.post("/api/persons", (request, response) => {
  console.log(request.body)
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
})

const PORT = process.env.PORT
app.listen(PORT), () => {
  console.log(`Server running on port ${PORT}`)
}

