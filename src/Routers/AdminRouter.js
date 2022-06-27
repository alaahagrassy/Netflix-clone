const express = require('express')
const router = express.Router() 
const {logIn} = require('../Controllers/AuthController')
const {CheckIfAdmin} = require('../middlewares/CheckIfAdmin')

//logIn 
router.post('/login' ,CheckIfAdmin, logIn)


module.exports = router