const UserModel = require('../Models/AuthModel')

const AuthorizeAdmin = async (req , res , next)=>{
    if(! req.headers.authorization)
    return res.json("Not Authorized")

    const token = req.headers.authorization
    const user = await UserModel.getCurrentUser(token)
    if(!user.isAdmin)
    return res.json("Authorization Failed")
    next();
}

module.exports = {AuthorizeAdmin}