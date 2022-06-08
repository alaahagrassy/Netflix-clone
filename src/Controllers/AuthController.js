const UserModel = require('../Models/AuthModel')
const { validationResult } = require('express-validator')

//register function

register = async (req, res, next) => {
    const { email, password,isAdmin } = req.body
    const user = await UserModel.findOne({ email })
    // check if email Exist 
    if (user) {
        return res.json({ message: 'User exist' })
    }
    const AddUser = new UserModel({
        email, password,isAdmin
    })
    try{
    const NewUser = await AddUser.save();
    await  NewUser.updateOne({
        $push:{isActive : 1}
    }).exec()
    const token = await NewUser.generatToken();
    if(!token)
    return res.json('Error')
    return res.status(200).json({token})
    }catch(err){
        console.log(err);
        return res.status(500).json('Server Error ')
    }
}

///login function

logIn = async (req, res) => {
    const { email, password } = req.body
    const FindUser = await UserModel.findOne({ email })
    if (FindUser) {
        const copmarePassword = await FindUser.comparepassword(password)
        if (!copmarePassword) {
            return res.json('Invalid email or password')
        }
        // await FindUser.updateOne({
        //     $push:{isActive : 1}
        // }).exec()
        const token = await FindUser.generatToken();
        res.json({ token })
    }
    else {
        return res.status(400).json("Not Found")
    }
}

//Update Profile function 

edit = async (req, res) => {
    const { id } = req.params
    const {userName, email  ,password} = req.body
    try {
        const user = await UserModel.findOneAndUpdate(email, {
            userName, email , password
        })
        res.status(200).json('Updated Successfully')
    }
    catch (err) {
        res.json({
            message: err
        })
    }
}

 /// get All User function

 getUsers = async (req , res )=>{

        const users = await UserModel.find()
        .populate('profile')
        .exec()
        .then(data=>{
            res.status(200).json(data)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
 }
 //get userById function

 getById = async (req ,res)=>{
    const {id} = req.params
    const user = await UserModel.findById(id)
    .populate('UserProfile' , ['isKid' , 'userName'])
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
 }
module.exports = { register, logIn, edit ,getUsers,getById }