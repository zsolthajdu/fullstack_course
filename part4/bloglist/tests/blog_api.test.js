const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialEntries = [
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog( initialEntries[0])
  await blogObject.save()
  blogObject = new Blog( initialEntries[1])
  await blogObject.save()
  blogObject = new Blog( initialEntries[2])
  await blogObject.save()
  blogObject = new Blog( initialEntries[3])
  await blogObject.save()
  blogObject = new Blog( initialEntries[4])
  await blogObject.save()
  blogObject = new Blog( initialEntries[5])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all entries are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe( initialEntries.length )
})

test('check for specific record content', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect( titles ).toContain(
    'Canonical string reduction'
  )
})

test('check that all records has an id field', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id )
  expect( ids.length).toBe( initialEntries.length )
})

test('a valid blog entry can be added ', async () => {
  const newBlog = {
    title: 'Ubuntu Pit',
    author: 'Clark Kent',
    url: 'http://ubuntupit.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body.length).toBe(initialEntries.length + 1)
  expect( titles ).toContain( 'Ubuntu Pit' )
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Clark Kent',
    url: 'http://ubuntupit.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send( newBlog )
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe( initialEntries.length)
})


test('blog without url is not added', async () => {
  const newBlog = {
    author: 'Clark Kent',
    title: 'Ubuntu pit',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send( newBlog )
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe( initialEntries.length)
})

test('blog without likes added with zero likes', async () => {
  const newBlog = {
    title: 'Slashdot',
    author: 'Bruce Wayne',
    url: 'http://slashdot.org',
  }

  await api
    .post('/api/blogs')
    .send( newBlog )
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const slashdot = response.body.find( b => b.title === 'Slashdot' )
  expect( slashdot.likes ).toBe( 0 )
})

const entriesInDb = async () => {
  const entries = await Blog.find({})
  return entries.map( blog => blog.toJSON())
}

test('Can delete an item', async () => {

  const blogsAtStart = await entriesInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete( `/api/blogs/${blogToDelete.id}`)
    .expect( 200 )

  const blogsAtEnd = await entriesInDb()

  expect( blogsAtEnd.length).toBe( blogsAtStart.length - 1)
  const titles = blogsAtEnd.map( b => b.title)
  expect( titles).not.toContain( blogToDelete.title )
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'batman',
      name: 'Bruce Wayne',
      password: 'Joker',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })


  test('creation fails with proper statuscode and message if no password is specified', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user321',
      name: 'theTester',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing !')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })




  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user321',
      name: 'theTester',
      password: 'ab',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(' at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ur',
      name: 'theTester',
      password: 'absdfrew',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message without a username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'theTester',
      password: 'abcd'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
