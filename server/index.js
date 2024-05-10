const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose'); // Corrected import statement
const authRoutes = require('./routes/authRoutes'); // Corrected path


const app = express()
const port = 8000
app.use(cors()); // Apply CORS middleware globally
app.use(express.json()); // Parse JSON bodies

app.use('/', authRoutes)

app.listen(port, () => console.log(`server is running on port ${port}`))