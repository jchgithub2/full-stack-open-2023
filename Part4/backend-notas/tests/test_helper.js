const Note = require('../models/note')
const User = require('../models/user')
const initialNotes = [
  /*{
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },*/
  {content: "HTML is easy",
   date: new Date(), 
   id: "64c045378d5cff3cf13af525",
   important: false
  },
  {content: "HTML is easy-",
   date: new Date(),
   id: "64c045378d5cff3cf13af529",
   important: false
  }, 
  {content: "Browser can execute only Javascript",
   date: new Date(), 
   id: "64c045378d5cff3cf13af526", 
   important: true
  }, 
   {content: "Browser can execute only Javascript",
   date: new Date(), 
   id: "64c045378d5cff3cf13af52a", 
   important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()// Se guarda la nueva nota en la base de datos
  await note.deleteOne()//.remove() Se elimina inmediatamente la nota

  return note._id.toString()// Se devuelve el identificador (_id) de la nota eliminada como una cadena
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
} 

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb, 
  usersInDb
}