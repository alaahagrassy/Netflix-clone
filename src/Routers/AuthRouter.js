const express = require('express')
const router = express.Router() 
const {register , logIn , edit ,getUsers,getById} = require('../Controllers/AuthController')
const {body , validationResult} = require('express-validator')
const {validateSignUp , valdateUpdateUser} = require('../Validations/UserValidation')

router.post('/register' , validateSignUp, register)
router.get('/login' , logIn)
router.put('/:id' ,valdateUpdateUser, edit)
router.get('/' , getUsers)
router.get('/:id' ,getById)

module.exports = router