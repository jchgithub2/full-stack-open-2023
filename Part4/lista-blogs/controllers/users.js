const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// ruta para mostrar los usuarios
usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, password, name} = request.body
    const existingUser = await User.findOne({ username })
    
          if (username.length < 3 || password.length < 3) {   // 4.16 step 4
             return response.status(400).send({ error: ' Username or password, must be at least 3 characters.'})
          } 
          /*  if (!password) {
            return response.status(400).send({ error: 'The password is required and must be valid' })
          } */
           if  (existingUser) {
            return response.status(400).send({ error: 'The username is already taken. Please choose another.'})
         }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter