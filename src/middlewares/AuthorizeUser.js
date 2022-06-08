const UserModel = require('../Models/AuthModel')

const authorizeUser = async (req , res , next)=>{
    const {id} = req.params
   const token = await req.headers.authorization
    const user = await UserModel.getCurrentUser(token)
    console.log(user);
    console.log(user.id);
    if(id !== user.id)
    return res.json('You are not authorized to complete this action')
    next()
}

module.exports={authorizeUser}