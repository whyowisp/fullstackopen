require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    selectedBooks(author: String, genre: String): [Book!]

    authorCount: Int!
    allAuthors: [Author!]

    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      id: Int
      genres: [String]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
    addAuthor(name: String!, id: String, born: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    //Book resolvers
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', { name: 1 })
      return books
    },
    selectedBooks: async (root, args) => {
      //Select all books if query has no genre
      if (args.genre === '') {
        return await Book.find({}).populate('author', { name: 1 })
      }

      const books = await Book.find({
        genres: { $in: [args.genre] },
      }).populate('author', { name: 1 })

      return books
    },

    //Author resolvers
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    //Book mutations
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser //Note: context is an object
      if (!currentUser) throw new AuthenticationError('not authenticated')
      if (args.title.length < 4)
        throw new UserInputError('Book title too short')
      console.log(
        'query from client looks like this in the backend: ' +
          JSON.stringify(args)
      )

      const authorExists = await Author.findOne({ name: args.author })
      //Create new author if not found
      if (!authorExists) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const author = await Author.findOne({ name: args.author })
      const authorId = author._id.toString()
      const book = new Book({ ...args, author: authorId })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      //While adding new book to db must have author as an mongo object id,
      //book returned as response have to be populated with actual author data
      //This data might be available without querying db, but i couldn´t find it
      const returningBook = book.populate('author', { name: 1 })
      return returningBook
    },
    //Author mutations
    addAuthor: async (root, args) => {
      if (args.name.length < 4)
        throw new UserInputError('Author name too short')

      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
        password: 'salainen',
      })

      try {
        user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      console.log('argumentit: ' + args.username + args.password)
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salainen') {
        throw new UserInputError('wrong creadentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      //Note to self: context argument must be an object
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
