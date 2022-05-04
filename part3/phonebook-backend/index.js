const { application, response } = require("express")
const express = require("express")
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

morgan.token(
  "resBody", (req, res) => {
    return JSON.stringify(req.body)
  } 
);
app.use(morgan(':resBody'))

let persons = [
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
]

app.get("/api/persons", (request, response) => {
  response.send(persons)
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

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(202).end()
})

app.post("/api/persons", (request, response) => {
  const newId = Math.floor(Math.random() * 1000)
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    })
  }
  //Creates new array with names only and checks if it includes name in question
  if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: "name exists already",
    })
  }

  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
