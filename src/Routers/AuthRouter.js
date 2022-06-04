const express = require('express')
const router = express.Router() 
const {register} = require('../Controllers/AuthController')
const {body , validationResult} = require('express-validator')
const {validateSignUp} = require('../Validations/UserValidation')

router.post('/register' , validateSignUp, register)

module.exports = router