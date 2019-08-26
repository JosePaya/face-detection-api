const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

// Controllers
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// Initializing database connection
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

// Initialize express server
const app = express();
app.use(bodyParser.json())
app.use(cors())

// app.get('/', (req, res) => {
//   db.select('*').from('user')
//     .then(users => res.json(users))
// })

app.get('/', (req, res) => res.send('It is working'))

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => image.handleClarifaiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`)
})