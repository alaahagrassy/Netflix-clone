const express = require('express')
const router = express.Router() 
const {profile , EditProfile , deleteProfile ,getUsers,getUser,deleteAllprofiles} = require('../Controllers/UserProfileController')
const {authorizeUser ,}  =require('../middlewares/AuthorizeUser')
const {AuthorizeProfile} =require('../middlewares/AuthorizeProfile')

router.post('/' ,authorizeUser,profile)
router.put('/' ,EditProfile)
router.delete('/' ,deleteProfile)
router.get('/' ,getUsers)
router.get('/one' ,authorizeUser,getUser)
router.delete('/all' ,deleteAllprofiles)

module.exports = router