const blogsRouter = require('express').Router()
const  Blog = require( '../models/blog' )
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate( 'user', { username:1, name:1, id:1 } )
  response.json(blogs.map( blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById( request.param.id )
    if( blog )
      response.json( blog.toJSON() )
    else
      response.status( 404 ).end()
  }
  catch( exception) {
    next( exception )
  }
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {

    const decodedToken = jwt.verify( request.token, process.env.SECRET)

    if ( !request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat( savedBlog._id )
    await user.save()
    response.json( savedBlog.toJSON() )
  }
  catch( exception ) {
    next( exception )
  }
})


blogsRouter.delete('/:id', async (request, response, next ) => {
  try {

    const decodedToken = jwt.verify( request.token, process.env.SECRET)

    if ( !request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    //const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById( request.params.id )

    if( blog.user.toString() === decodedToken.id ) {
      await Blog.findByIdAndRemove( request.params.id )
      response.json( 204).end()
    }
    else {
      return response.status(401).json({ error: 'Can\'t delete other user\'s blog' })
    }
  } catch( exception ) {
    next( exception )
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    _id: request.params.id
  })

  try {
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json( savedBlog.toJSON() )
  } catch( exception ) {
    next( exception )
  }
})

module.exports = blogsRouter
