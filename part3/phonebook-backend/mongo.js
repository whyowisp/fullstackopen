const mongoose = require("mongoose")

const password = process.argv[2]
const url = `mongodb+srv://username:${password}@cluster0.lf1wd.mongodb.net/personApp?retryWrites=true&w=majority`
mongoose.connect(url)

//Handle short argument length
if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> to get all data from db \n or node mongo.js <passwod> <name> <phonenumber> to add new item.>"
  )
  process.exit(1)
} 


//Handle ok argument lengths...

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

// ..find all
if (process.argv.length === 3) {
  console.log('Phonebook:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })

// ..add new
} else if (process.argv.length === 5) {
  const personName = process.argv[3]
  const personNumber = process.argv[4]

  const person = new Person({
    name: personName,
    number: personNumber,
  })

  person.save().then((result) => {
    console.log(result + " saved to database")
    mongoose.connection.close()
  })
}
