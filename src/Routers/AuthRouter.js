const express = require('express')
const router = express.Router() 
const {register , logIn , edit ,getUsers,getById,Remove ,plan,getuser,editForAdmin,ChangePassword,destroy,devices,watchedMovies,removeDevice,DeletFav,logOut,FavMovies} = require('../Controllers/AuthController')
const {validateSignUp , valdateUpdateUser,paymentValidation } = require('../Validations/UserValidation')
const {authorizeUser} = require('../middlewares/AuthorizeUser')
const {checkForLoggedIn} = require('../middlewares/CheckForLogged')


router.post('/register' , checkForLoggedIn,validateSignUp, register)
router.post('/login' ,checkForLoggedIn ,logIn)
router.put('/edit',authorizeUser, edit)
router.get('/getuser' ,authorizeUser,getById)

router.delete('/:id' ,Remove)
router.put('/Plan' ,authorizeUser,plan)
router.delete('/',destroy)
router.put('/device',authorizeUser,devices)
router.put('/Deletedevice',authorizeUser,removeDevice)
router.put('/changepassword',authorizeUser,ChangePassword)
router.put('/logout',authorizeUser,logOut)

router.put('/fav',authorizeUser,FavMovies)
router.put('/watched',authorizeUser,watchedMovies)
router.put('/delFav',authorizeUser,DeletFav)


//forAdmin

router.put('/:id', editForAdmin)
router.get('/all', getUsers)
router.get('/:id' ,getuser)
module.exports = router