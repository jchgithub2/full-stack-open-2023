const mongoose = require('mongoose')

const password = process.argv[2]

const url =`mongodb+srv://user1:${password}@phonebook.ucpjues.mongodb.net/phonebook-app?retryWrites=true&w=majority`

const personSchema=new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
  console.log('conexion exitosa')

  if (process.argv.length === 3) {
  return Person.find({})
} else if (process.argv.length === 5) {
  const Person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  
  return Person.save()
}
  })

  .then(result => {
    if (process.argv.length === 3) {
      console.log('phonebook:')

      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    } else if (process.argv.length === 5) {
      console.log(`added ${result.name} number ${result.number} phonebook`)
    }
    mongoose.connection.close()
  })

