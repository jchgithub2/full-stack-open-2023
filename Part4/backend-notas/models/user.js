const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    unique: true
    },
    name: String,
    passwordHash: String,
    notes: [   //Los identificadores de las notas se almacenan dentro, como una matriz de ID de Mongo
        { 
            type:  mongoose.Schema.Types.ObjectId, 
            ref: 'Note'  //referencia al usuario que la creo
        }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User 