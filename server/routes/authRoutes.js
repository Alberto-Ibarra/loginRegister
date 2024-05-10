const express = require('express')
const cors = require('cors')
const router = express.Router()

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

// Import controller
const { test } = require('../controllers/authController');

router.get('/', test)

module.exports = router