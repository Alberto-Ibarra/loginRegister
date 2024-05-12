const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); 
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const port = 8000;

// Allow requests from specific origin and include credentials
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json()); // Parse JSON bodies

// Database connection
mongoose.connect(process.env.MONGOURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Database connection error:', err));

app.use('/api', authRoutes); // Prefix the routes with '/api'

app.listen(port, () => console.log(`Server is running on port ${port}`));
