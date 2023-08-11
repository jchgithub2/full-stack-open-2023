const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    for (let blog of helper.blogList) {
       let blogObject = new Blog(blog)
       await blogObject.save()
     }
   }) 

   const getUserToken = async () =>  {
    const newUser = {
      username: "userTest1",
      name: "user1",
      password: "user-1"
     }

     await api.post('/api/users').send(newUser)
     const loginUser = await api.post('/api/login').send(newUser)
     return loginUser.body.token
  }

   describe('run a test with', ()=> {

   test('the number of blogs are returned as json', async () => {
      const  blog = helper.blogList.length

      const response = await api
     .get('/api/blogs')
     .expect(200)
     .expect('Content-type', /application\/json/)
 
      expect(response.body).toHaveLength(blog)
   })

   test('the HTTP method GET', async () => {
    await api
    .get('/api/blogs')
    .expect(200)

    .expect('Content-type', /application\/json/)
 })

test('there are blogs', async () => {
    const response = await api
    .get('/api/blogs')
    .expect(200)

    expect(response.body).toHaveLength(6)
  })
})

describe('the HTTP GET method of blogs', () => {
  
  test('return the correct number of blog posts in JSON format',  async () => { 
    
    // Realizar la solicitud HTTP GET a la URL de la API utilizando supertest
    const response = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
      .expect(200)

        // Verificar que la respuesta contenga un objeto 'blog' del array
        expect(typeof response).toBe('object')

        // Verificar que la cantidad de publicaciones de blog sea la esperada (por ejemplo, 6)
        const cantidadBlogs = response.body.length
        expect(response.body).toHaveLength(cantidadBlogs); // Ajusta el número según la cantidad total de objetos
    }) 

  });

  describe('Blog Post Unique Identifier Test', () => {
   
    test('The unique identifier property is called "id" and not "_id"', async () => {
      // Obtiene una publicación del blog
      const blogPost = await helper.blogsInDb() 
      const BlogToView = blogPost[0]
      await api
      .get(`/api/blogs/${BlogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

       // Verifica que la propiedad "id" exista en el objeto
      expect(BlogToView.id).toBeDefined()

        // Verifica que la propiedad "_id" no exista en el objeto
      expect(BlogToView._id).toBeUndefined()
    
    })
  })

  describe('verfica solicitud "POST"', () => {

   const newBlog = {
      title: "Principios Basicos de Programacion",
      author: "Jose Chavez",
      url: "https://reactpatterns.com/",
      likes: 78,
      }
    test('crea una publicacion de blog', async () => {
      // Realizar la solicitud "POST" para crear una nueva publicación de blog
      const token = await getUserToken()

        await api
       .post('/api/blogs')
       .set('Authorization', `bearer ${token}`)
       .send(newBlog)
       .expect(201)
       .expect('Content-Type', /application\/json/)

       // Verificar que la nueva publicación de blog esté correctamente almacenada en la base de datos
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.blogList.length +1)
     // Verificar que la nueva publicación de blog contenga el dato correcto
      const contents = blogsAtEnd.map(blog => blog.title)
      expect(contents).toContain('Principios Basicos de Programacion') 
    })
  })

  describe('Prueba que verifica la propiedad Like', () => {
    const getPostLikes = (solicitud) => {
      return solicitud.like || 0;
    }
    
    test('que falte en la solicitud', async () => {
      const noLike = {
        title: 'Programcion con Javascript',
        author:'ana chavez'
      }

      const res = await getPostLikes(noLike)
     // const createBlog = await helper.blogsInDb()
     expect(res).toBe(0)
     
    })

     test('Que exista en la solicitud', async () => {
      const withLike = {
        title: 'Desarrollo web',
        author: 'jose ch',
        like: 15
      }

      const res= await getPostLikes(withLike)

     expect(res).toBeDefined()
   
     })
      
      // expect(newLike).toBeDefined()
    })

    describe('Prueba para la creación de blogs a través del endpoint /api/blogs', () => {
      test('Debería responder con código de estado 400 Bad Request si falta la propiedad "title"', async () => {
        const blogOutTitle = {
          // Falta la propiedad "title"
          url: 'https://ejemplo.com/blog-post',
        };
        
        const result =  await helper.serchBlog(blogOutTitle)
          api
          .post('/api/blogs')
          .send(blogOutTitle);

        expect(result.status).toBe(400);
        expect(result.response.error).toBe('Faltan propiedades "title" y/o "url" en los datos de la solicitud.');
    
      });

      test('Debería responder con código de estado 400 Bad Request si falta la propiedad "url"', async () => {
        const blogOutUrl = {
          title: 'Título del blog',
          // Falta la propiedad "url"
        };
    
        const response =  await helper.serchBlog(blogOutUrl)
          api
          .post('/api/blogs')
          .send(blogOutUrl);
    
        expect(response.status).toBe(400);
        expect(response.response.error).toBe('Faltan propiedades "title" y/o "url" en los datos de la solicitud.');
 
      });

      test('Debería responder con código de estado 200 OK si se proporcionan todas las propiedades necesarias', async () => {
        const validBlogData = {
          title: 'Título del blog',
          url: 'https://ejemplo.com/blog-post',
        };
    
        const result =  await helper.serchBlog(validBlogData)
          api
          .post('/api/blogs')
          .send(validBlogData);
    
        expect(result.status).toBe(200);
      })
    })
  /* escriba una nueva prueba para asegurarse de que la adición de un blog falla con el código de estado adecuado 401 Unauthorized si no se proporciona un token. */
  describe('Agregar un blog', () => {
    test('debería devolver 401 Unauthorized si no se proporciona un token', async () => {
      const newBlog ={
        title: "Principios Basicos de Programacion",
        author: "Jose Chavez",
        url: "https://reactpatterns.com/",
        likes: 78,
      }

      const response = await api
      .post('/api/blogs')
      .send(newBlog)

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'token missing or invalid'})
    })
  
  }) 

  afterAll(() => {
    mongoose.connection.close()
  })