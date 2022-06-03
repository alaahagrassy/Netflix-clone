const express = require('express')
const router = express.Router() 
const {register} = require('../Controllers/AuthController')
const {body , validationResult} = require('express-validator')

router.post('/register' , 
body('email').isEmail().isEmpty(),
body('password').isEmpty(),
body('expirationDate').isDate(),
body('securityCode').isLength({min : 3 , max:4})

, register)

module.exports = router