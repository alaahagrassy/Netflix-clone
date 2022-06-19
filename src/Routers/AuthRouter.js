const express = require('express')
const router = express.Router() 
const {register , logIn , edit ,getUsers,getById,Remove ,payment,plane} = require('../Controllers/AuthController')
const {validateSignUp , valdateUpdateUser,paymentValidation } = require('../Validations/UserValidation')
const {authorizeUser} = require('../middlewares/AuthorizeUser')
const {checkForLoggedIn} = require('../middlewares/CheckForLogged')


router.post('/register' , checkForLoggedIn,validateSignUp, register)
router.get('/login' ,checkForLoggedIn,  logIn)
router.put('/:id' ,authorizeUser,valdateUpdateUser, edit)
router.get('/', getUsers)
router.get('/:id' ,getById)
router.delete('/:id' ,Remove)
router.post('/payment/:id' , authorizeUser,payment)
router.post('/Plane/:id' ,authorizeUser,plane)

module.exports = router