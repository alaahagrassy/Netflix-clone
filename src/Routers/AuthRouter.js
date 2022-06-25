const express = require('express')
const router = express.Router() 
const {register , logIn , edit ,getUsers,getById,Remove ,payment,plan,destroy,devices,removeDevice,logOut} = require('../Controllers/AuthController')
const {validateSignUp , valdateUpdateUser,paymentValidation } = require('../Validations/UserValidation')
const {authorizeUser} = require('../middlewares/AuthorizeUser')
const {checkForLoggedIn} = require('../middlewares/CheckForLogged')


router.post('/register' , checkForLoggedIn,validateSignUp, register)
router.post('/login' ,checkForLoggedIn ,logIn)
router.put('/edit' ,authorizeUser,valdateUpdateUser, edit)
router.get('/', getUsers)
router.get('/' ,authorizeUser,getById)
router.delete('/:id' ,Remove)
router.put('/payment' , authorizeUser,paymentValidation,payment)
router.put('/Plan' ,authorizeUser,plan)
router.delete('/',destroy)
router.put('/device',authorizeUser,devices)
router.put('/Deletedevice',authorizeUser,removeDevice)
router.put('/logout',authorizeUser,logOut)

module.exports = router