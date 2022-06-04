const UserModel = require('../Models/AuthModel')

const CheckIfAdmin = async (req , res , next)=>{
    const {email} = req.body;
    const user = await UserModel.findOne({email})
    if(user.role !== "admin")
    return res.json('Invalid email or password');
    next()
}

module.exports = {CheckIfAdmin}