const UserModel = require('../Models/AuthModel')

const CheckIfAdmin = async (req , res , next)=>{
    const {email} = req.body;
    // console.log(email);
    const user = await UserModel.findOne({email})
    // console.log(user);
    if(!user.isAdmin)
    return res.json('Invalid email or password');
    next()
}

module.exports = {CheckIfAdmin}