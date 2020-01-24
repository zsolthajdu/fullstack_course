const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const User = require('./models/user')
const Book = require('./models/book.js')
const jwt = require('jsonwebtoken')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useUnifiedTopology', true )
mongoose.set('useFindAndModify', false)

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

MONGODB_URI = ...

console.log('commecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    id: ID!
    published: Int!
    genres:[String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    Author: Author!
    authorCount: Int!
    allBooks( genre:String, author:String ): [Book!]!
    allAuthors:[ Author!]!
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addAuthor(
      name: String!
      born: Int!
    ):Author

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token    
  }

	type Subscription {
		bookAdded: Book!
	}
`

const resolvers = {
  Query: {

    bookCount: () => Book.count(),

    authorCount: () => Author.count(),

    allBooks: async (root, args ) => {

      if( args.author ) {
        const author = Author.find( { name: args.author } )
        // TODO fix 'author' argument. Doesn't work
        B2 = await  Book.find( { author: author.id } )
          .populate( 'author', { name:1,born:1 } )
          .exec()
        if( args.genre )
          return B2.filter( b => b.genres.includes( args.genre ) )
        else
          return B2
      }
      else if( args.genre )
        return await Book.find( { genres: { $in: [args.genre ] } } )
            .populate( 'author', { name:1,born:1 } )
            .exec()
      return await Book.find({})
        .populate( 'author', { name:1,born:1 } )
        .exec()
    },

    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async( author) => {
      B2 = await Book.find( { author: author.id } )
      return B2.length
    }
  },
  Mutation: {
    addAuthor: async (root, args, context) => {
      const author = new Author( {...args} )

      try {
        await author.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    addBook: async (root, args, context) => {
      const book = new Book({ ...args } )
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne( {name: args.author} )
      if( author === null ) {
        // Author is not in list
        console.log( 'Adding author ' + args.author )
        const new_author = new Author( { name: args.author, born:null } )
        try {
          await new_author.save()
          author = new_author
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      console.log( "addBook: author=" + author.name )
      book.author = author

      try {
        await book.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      book.populate( 'author', { name:1,born:1 } )
		pubsub.publish( 'BOOK_ADDED', { bookAdded: book } )
      return book
    },

    //
    // To modify an author record. Can update author birth year
    //
    editAuthor: async ( root, args, context ) => {
      const author =  await Author.findOne( {name: args.name} )
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if( !author)
        return null
      author.born = args.setBornTo
      await author.save()
      return author
    },

    createUser: (root, args) => {
      const user = new User( {...args} )

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator( ['BOOK_ADDED'] )
		},
	},
}

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if( auth && auth.toLowerCase().startsWith('bearer ') ) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById( decodedToken.id )
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log( `Subscriptions ready at ${subscriptionsUrl}` )
})
