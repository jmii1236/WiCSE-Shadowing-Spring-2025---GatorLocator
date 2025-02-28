const PORT = 8000
const express = require('express')
const {MongoClient, UUID} = require('mongodb')
const uri = 'mongodb+srv://steiertskyler:mypassword@cluster0.rbkbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello to my app')
})

app.post('/signup', async (req, res) => {
  const user = new MongoClient(uri)
  const {email, password} = req.body

  const makeUserID = uuidv4()
  const hashedPass = await bcrypt.hash(password, 10) 

  try {
        await user.connect()
        const database = user.db('app-data')
        const users = database.collection('users-data')

        const existing = await users.findOne({email})

        if (existing) {
            return res.status(409).send('User already exists. Please login')
        }
        const cleanEmail = email.toLowerCase()

        const userData = {
          user_id: makeUserID,
          email: cleanEmail,
          hashed_password: hashedPass
      }
      const newUser = await users.insertOne(userData)

      const token = jwt.sign(newUser, cleanEmail, {expiresIn: 60 * 48})

      res.status(201).json({token, user_id: makeUserID, email: cleanEmail})

      }
      catch (err) {
        console.log(err)
    } finally {
        await user.close()
    }
})

app.post('/login', async (req, res) => {
  const user = new MongoClient(uri)
  const {email, password} = req.body
  try {
    await user.connect()
    const database = user.db('app-data')
    const users = database.collection('users-data')
    
    const theUser = await users.findOne({email})
    
    const correctPass = await bcrypt.compare(password, user.hashed_password)
 
    if (theUser && correctPass) {
      const token = jwt.sign(theUser, email, {
        expiresIn: 60 * 48
      })
      res.status(201).json({token, user_id: theUser.user_id, email})
    }
    res.status(400).send('Invalid Credentials') 
  }
  catch (err) {
    console.log(err)
  }
})

app.get('/user-data', async (req, res) => {
  const user = new MongoClient(uri)

  try {
    await user.connect()
    const database = user.db('app-data')
    const users = database.collection('users-data')

    const returned = await users.find().toArray()

    res.json(returned) // Send JSON response
  } finally {
    user.close()
  }
})


app.listen(PORT, () => console.log('Server running on PORT ' + PORT))

