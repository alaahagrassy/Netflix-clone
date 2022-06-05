const express = require('express')
const router = express.Router() 
const {profile , EditProfile , deleteProfile} = require('../Controllers/UserProfileController')
const {authorizeUser}  =require('../middlewares/AuthorizeUser')

router.post('/' , authorizeUser,profile)
router.put('/' , authorizeUser,EditProfile)
router.delete('/' , authorizeUser,deleteProfile)


module.exports = router