const express = require('express')
const router = express.Router() 
const {register , logIn , edit ,getUsers,getById} = require('../Controllers/AuthController')
const {validateSignUp , valdateUpdateUser } = require('../Validations/UserValidation')
const {authorizeUser} = require('../middlewares/AuthorizeUser')
const {checkForLoggedIn} = require('../middlewares/CheckForLogged')

router.post('/register' , checkForLoggedIn,validateSignUp, register)
router.get('/login' ,checkForLoggedIn, logIn)
router.put('/:id' ,authorizeUser,valdateUpdateUser, edit)
router.get('/' , getUsers)
router.get('/:id' ,getById)

module.exports = router