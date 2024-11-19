const {token}= require('../controllers/user')

const express = require('express')
const router = express.Router()

router.route('/').post(token)

module.exports = router