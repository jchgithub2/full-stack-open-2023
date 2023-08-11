const dummy = () => {
    return 1
      // .split('')
      // .reverse()
      // .join('')
  }

  const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.likes
    return blogs.reduce(reducer, 0)
  }

  const favoriteBlog = (blogs) => {
    return blogs.reduce((count,blog) => count = count.likes > blog.likes ? count : blog, 0
    )
  }

  const mostBlogs = (blogs) => {
   // Crear un objeto para almacenar los blogs por autor 
  const serch = blogs.reduce((a, b) => {
    a[b.author] = [...a[b.author] || [], b]
    return a
  }, {})
    
  // Encontrar al autor con más blogs
  let mostBlogsAuthor= null;
  let maxBlogs = 0;

  for (const author in serch) {
    const numBlogs = serch[author].length;
     if (numBlogs > maxBlogs) {
      mostBlogsAuthor = author;
      maxBlogs = numBlogs;
     }
  }
  
    return  {
      author: mostBlogsAuthor,
      blogs: maxBlogs
    }
  }

  const mostLikes = (blogs) => {
    const sumLikes = (acc, val) => acc + val.likes

   // crear objeto para almacenar los likes por author
    const serch = blogs.reduce((res, b) => {
      res[b.author] = [...res[b.author] || [], b]
      return res
    }, {})

    // buscar el author con mas likes
    let likes = 0;
    let mostLikesAuthor = '';

    Object.keys(serch).forEach(author => {
      const totalLikes = serch[author].reduce(sumLikes, 0);
      if (totalLikes > likes) {
        likes = totalLikes;
        mostLikesAuthor = author;
      }
    })

    return {
      author: mostLikesAuthor,
      likes: likes
    }
  }
   
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }