const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
})

schema.set('toJSON', {
  transform: (document, returnObject) => {
    //id is needed in string form
    returnObject.id = returnObject._id.toString()
    //delete unnecessary clutter
    delete returnObject._id
    delete returnObject.__v
  },
})

const book = mongoose.model('Book', schema)
module.exports = book
