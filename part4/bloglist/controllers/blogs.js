let blogsRouter = require('express').Router()
let Blog = require( '../models/blog' )

blogsRouter.get('/', (request, response) => {
  console.log( "GET start" )
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map( blog => blog.toJSON()))
    })
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  blog
    .save()
    .then( savedBlog => {
      response.json( savedBlog.toJSON() )
    })
    .catch( error => next(error) )
})

module.exports = blogsRouter
