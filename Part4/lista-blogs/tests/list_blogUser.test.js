const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./blog_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    }, 30000)

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Robert',
            name: 'Robert C. Martin',
            password: 'martin',
          }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
    }, 15000)

})
 describe('when we try to create invalid users', () => {
     test('creation fails with proper statuscode and message if username already taken', async () => {
         const usersAtStart = await helper.usersInDb()
    
         const newUser = {
             username: 'Robert',
             name: 'Robert C. Martin',
             password: 'martin',
           }
    
           await api
           .post('/api/users')
           .send(newUser)
           .expect(400)
           .expect('Content-Type', /application\/json/)

    
         const usersAtEnd = await helper.usersInDb()
         expect(usersAtEnd).toHaveLength(usersAtStart.length)
       }, 15000) 
 })

 afterAll(() => {
     mongoose.connection.close()
   })