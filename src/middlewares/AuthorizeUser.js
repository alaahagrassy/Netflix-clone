const UserModel = require('../Models/AuthModel')

const authorizeUser = async (req , res , next)=>{

   const token =  req.headers.authorization
   if(!token)
   return res.json('You are not authorized')
    const user = await UserModel.getCurrentUser(token)
    if(!user.id)
    return res.json('You are not authorized to complete this action')
    req.userId = user.id
    next()
}

module.exports={authorizeUser}