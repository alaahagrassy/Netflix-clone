const express = require('express')
const router = express.Router() 
const {profile , EditProfile , deleteProfile ,getUsers} = require('../Controllers/UserProfileController')
const {authorizeUser}  =require('../middlewares/AuthorizeUser')

router.post('/' ,profile)
router.put('/' ,EditProfile)
router.delete('/' ,deleteProfile)
router.get('/' ,getUsers)

module.exports = router