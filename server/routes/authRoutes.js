const express = require('express')
const cors = require('cors')
const router = express.Router()
const { test, registerUser } = require('../controllers/authController');


// Import controller
router.get('/', test)
router.post('/register', registerUser)

module.exports = router