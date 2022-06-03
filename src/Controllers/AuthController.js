const UserModel = require('../Models/AuthModel')
const {validationResult} = require('express-validator')

//register function

register = async (req , res , next)=>{
    const {FirstName , LastName , email , password , cardNumber,expirationDate,securityCode} = req.body
    const user = await UserModel.findOne({email})

    // check if email Exist 
    if(user){
        return res.json({message:'User exist'})
    }
    //check if the cardNumber Exist

    const NewUser = new UserModel({
        FirstName,LastName,email,password,cardNumber,expirationDate,securityCode
    }).save()
    .then(data=>{
        const token = data.generatToken();
        if(!token)
        return res.json("error")
        return res.json({token})
    }).catch(err=>{
        res.json({
            message:err
        })
    })


}

module.exports = {register}