const express = require('express')
const router = express.Router()
const { Login , Signin } = require('../controller/user')

router.post('/login', Login);
router.post('/signin', Signin);

module.exports = router