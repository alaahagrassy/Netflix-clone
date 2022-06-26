const express = require('express')
const router = express.Router() 
const {profile , EditProfile , deleteProfile ,getUsers,deleteAllprofiles} = require('../Controllers/UserProfileController')
const {authorizeUser}  =require('../middlewares/AuthorizeUser')

router.post('/' ,authorizeUser,profile)
router.put('/' ,EditProfile)
router.delete('/' ,deleteProfile)
router.get('/' ,getUsers)
router.delete('/all' ,deleteAllprofiles)

module.exports = router