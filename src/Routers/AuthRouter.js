const express = require('express')
const router = express.Router() 
const {register , logIn , edit ,getUsers,getById,Remove ,payment,plan,destroy} = require('../Controllers/AuthController')
const {validateSignUp , valdateUpdateUser,paymentValidation } = require('../Validations/UserValidation')
const {authorizeUser} = require('../middlewares/AuthorizeUser')
const {checkForLoggedIn} = require('../middlewares/CheckForLogged')


router.post('/register' , checkForLoggedIn,validateSignUp, register)
router.post('/login' ,checkForLoggedIn ,logIn)
router.put('/edit' ,authorizeUser,valdateUpdateUser, edit)
router.get('/', getUsers)
router.get('/:id' ,getById)
router.delete('/:id' ,Remove)
router.put('/payment' , authorizeUser,paymentValidation,payment)
router.put('/Plan' ,authorizeUser,plan)
router.delete('/',destroy)

module.exports = router