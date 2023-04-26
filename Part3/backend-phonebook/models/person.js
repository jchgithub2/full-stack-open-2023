const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name required must be unique'],
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'number is required'],
    unique: true,
  },
})
//habilito error personalizado implementado
personSchema.path('name').validate({
  validator: function(v) {return v.length > 3 },
  message: function(props) {
    return `${props.path} The minimum characters is 3, got '${props.value}'`
  }
})

personSchema.plugin(uniqueValidator, { message: 'mongoose-unique-validator' })

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__
  },
})

module.exports = mongoose.model('Person', personSchema)
