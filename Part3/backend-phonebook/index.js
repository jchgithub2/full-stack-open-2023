const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('build'))

app.use(cors())

app.use(express.json())

morgan.token('body', ( req ) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)

app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ')
  )
)



const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  //  console.log('Path:  ', request.path)
  // console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError')
    return response.status(400).json({ type: 'mongoose-unique-validator' })

  console.error(error.message)

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)

// let  persons = [
//     {
//       id: 1,
//       name: "Arto Hellas",
//       number: "040-123456"
//     },
//     {
//       id: 2,
//       name: "Ada Lovelace",
//       number: "39-44-5323523"
//     },
//     {
//       id: 3,
//       name: "Dan Abramov",
//       number: "12-43-234345"
//     },
//     {
//       id: 4,
//       name: "Mary Poppendieck",
//       number: "39-23-6423122"
//     }
//   ]

app.get('/info', (_request, response, next) => {
  Person.find({}).then(persons => {
    response.send(`<p><strong>Phonebook has info  ${persons.length} people</strong></p> <br>${new Date()}`)
  })
    .catch(error => next(error))
})

app.get('/api/persons', (_request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name required must be unique'
    })
  }

  else if(body.number === undefined) {
    return response.status(400).json({
      error:  'number is required'
    })
  }

  // NEW Object to DB
  const person = new Person ({
  // id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savePerson => savePerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})