const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose'); 
const authRoutes = require('./routes/authRoutes'); 


const app = express()
const port = 8000
app.use(cors()); // Apply CORS middleware globally
app.use(express.json()); // Parse JSON bodies

//database connection
mongoose.connect(process.env.MONGOURI)
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log('database not connected', err))

app.use('/', authRoutes)

app.listen(port, () => console.log(`server is running on port ${port}`))