const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const salt_round = Number(process.env.salt_rounds)
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
        type: Number,
        required:[true, 'Card Number required'],
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
 UserModel.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(salt_round, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });

});

////comapre password
UserModel.methods.comparepassword = function(pass){
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
    process.env.jwt_secret
    )
}



module.exports= model('User' , UserModel )