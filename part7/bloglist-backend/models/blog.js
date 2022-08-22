const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      comment: String,
    },
  ],
  url: String,
  likes: Number,
})

//This might be valuable later
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //_id returned from mongoose is not a string
    returnedObject.id = returnedObject._id.toString()
    //We will not need original _id, neither _v
    delete returnedObject._id
    delete returnedObject._v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
