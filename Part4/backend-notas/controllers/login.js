const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
   // busca al usuario y contraseña de DB
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)// metodo que verifica si la contraseña es correcta

    // si no encuentra al usuarioo la contraseña es incorrecta responde con 401 noAuthorized
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
      }

      // Si la contraseña es correcta, se crea un token con el método jwt.sing() que contien el nombre y la id de usuario en un form firmado digitalmente
      const token = jwt.sign(userForToken, 
        process.env.SECRET, 
        {expiresIn: 60*60})
        
      response
        .status(200)
        .send({ token, username: user.username, name: user.name }) 

})

module.exports = loginRouter