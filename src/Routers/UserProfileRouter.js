const express = require('express')
const router = express.Router() 
const {profile , EditProfile , deleteProfile ,getUsers,getUser,deleteAllprofiles} = require('../Controllers/UserProfileController')
const {authorizeUser ,}  =require('../middlewares/AuthorizeUser')
router.post('/' ,authorizeUser,profile)
router.put('/:id' ,EditProfile)
router.delete('/:id' ,deleteProfile)
router.get('/' ,getUsers)
router.get('/one' ,authorizeUser,getUser)
router.delete('/all' ,deleteAllprofiles)

module.exports = router