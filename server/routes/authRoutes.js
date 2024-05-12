const express = require('express')
const cors = require('cors')
const router = express.Router()
const { test, registerUser, loginUser } = require('../controllers/authController');


// Import controller
router.get('/', test)
router.post('/register', registerUser)
router.get('/login', loginUser)

module.exports = router