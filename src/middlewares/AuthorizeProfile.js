const UserModel = require('../Models/AuthModel')
const ProfileModel = require('../Models/userProfileModel')

const AuthorizeProfile = async (req , res , next)=>{
   const token = await req.headers.authorization
    const user = await UserModel.getCurrentUser(token)
    const id = user.id
    console.log(id);
    const profilefind = await ProfileModel.findOne({id})
    console.log(profilefind);
    if(!profilefind)
    return res.json('You are not authorized to complete this action')
    req.userId = user.id
    next()
}

module.exports={AuthorizeProfile}