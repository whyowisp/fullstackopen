const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
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

const author = mongoose.model('Author', schema)
module.exports = author
