const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---');

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint sin conexion con el servidor BD' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.title === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.title === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'jsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = async (request, response, next) => { 
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
  //  console.log("\n\nTOKEN AUTHORIZATION\n\n", authorization)
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  
  next()
 // console.log("\n\nTOKEN AUTHORIZATION\n\n", authorization)
 }

 const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
   // console.log("\n\nTOKEN AUTHORIZATION\n\n", decodedToken)
    if (!request.token || !decodedToken.id) {
     // console.log("\n\nDECODED TOKEN\n\n", decodedToken)
    } 
   const user = await User.findById(decodedToken.id)
   //console.log("\n\nUSER\n\n", user)
   request.user = user
    next()
  } catch (error) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}