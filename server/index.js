const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); 
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser') 

const app = express();
const port = 8000;

// Allow requests from specific origin and include credentials
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json()); // Parse JSON bodies
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/api', authRoutes); // Prefix the routes with '/api'


// Database connection
mongoose.connect(process.env.MONGOURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Database connection error:', err));


app.listen(port, () => console.log(`Server is running on port ${port}`));
