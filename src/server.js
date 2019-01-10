const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// SQLite used to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

// Define our Person model for submitting personnel details
let Person = database.define('persons', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  address: Sequelize.STRING,
  company: Sequelize.STRING,
  salary:  Sequelize.FLOAT
})

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for the Person model
let userResource = epilogue.resource({
  model: Person,
  endpoints: ['/persons', '/persons/:id']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })
