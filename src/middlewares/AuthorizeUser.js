const UserModel = require('../Models/AuthModel')

const authorizeUser = async (req , res , next)=>{
    const {id} = req.params
   const token = await req.headers.authorization
    const user = await UserModel.getCurrentUser(token)

    if(id !== user.id)
    return res.json('You are not authorized to complete this action')
    next()
}

module.exports={authorizeUser}