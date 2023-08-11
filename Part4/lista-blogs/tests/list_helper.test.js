const listHelper = require('../utils/list_helper')
 const blogs = [{
  title: "React patterns",
  author: "Michael Chan",
  likes: 7
},
{
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  likes: 5
},
{
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  likes: 12
},
{
  title: "First class tests",
  author: "Robert C. Martin",
  likes: 10,
},
{
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  likes: 0
},
{
  title: "Type wars",
  author: "Robert C. Martin",
  likes: 2
} ]
test('dummy returns one', () => {
  const blogs = []

   const result = listHelper.dummy(blogs)
   expect(result).toBe(1)
 })

describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'real python',
      author: 'Albert Consture',
      url: 'http://realpython.com/',
      likes: 95
    }
  ] 


test('when list has only one blog, equals the likes of that', () => {
  const result = listHelper.totalLikes(listWithOneBlog)
  expect(result).toBe(95)
  })
})


describe('blog with', () => {
  const listBlog =[
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 10
    }
  ]

  test('most likes is', () => {
    const result = listHelper.favoriteBlog(listBlog)
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 10
      }
    )
  })
})

describe('author with most blogs', () => {
  const blog = blogs

    test('most blogs and likes', () => {
      const result = listHelper.mostBlogs(blog)
      expect(result).toEqual(
        {
          author: 'Robert C. Martin',
          blogs: 3
        }
      )
    })

    test('most likes in blogs is', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual(
        {
          author: "Edsger W. Dijkstra",
          likes: 17
        }
      )
    })
   
})