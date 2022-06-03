const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const util = require('util')
const sign = util.promisify(jwt.sign)
const  verify = util.promisify(jwt.verify) 
const {Schema} = mongoose
const {model} = mongoose
const UserModel = new Schema({
    FirstName : {
        type: String,
        required:[true, 'First Name is required'],
    },
    LastName:{
        type: String,
        required:[true, 'Last Name is required'],
    },
    email:{
        type: String,
        required:[true, 'Email is required'],
        index:{
            unique:[true , "this email is already taken"]
        }
    },
    password:{
        type: String,
        required:[true, 'password required'],

    },
    cardNumber:{
        type: String,
        required:[true, 'Card Number required'],
        index:{
            unique:[true , "Invalid"]
        }
    },
    expirationDate:{
        type:Date,
        // required:[true , 'expiration Date required']
    },
    securityCode:{
        type:Number,
        // required:[true , 'security Code required']
    }
})

 ////hashing password
UserModel.pre('save' , async (next)=>{
     bcrypt.genSalt(process.env.salt_rounds , function(err,salt){
         bcrypt.hash(this.password , salt ,function(err,hash){
             this.password = hash
             next()
         } )
     })
    
})

////comapre password
UserModel.method,comparepassword = function(pass){
    return bcrypt.compare(pass,this.password)
}

//generate token
UserModel.methods.generatToken = function(){
    return jwt.sign({
        _id:JSON.stringify(this._id),
        FirstName:JSON.stringify(this.FirstName),
        LastName:JSON.stringify(this.LastName),
        email:JSON.stringify(this.email),
        cardNumber:JSON.stringify(this.cardNumber),
        expirationDate:JSON.stringify(this.expirationDate),
        securityCode:JSON.stringify(this.securityCode)
    },
    'secret'
    )
}



module.exports= model('User' , UserModel )