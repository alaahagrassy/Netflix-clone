const mongoose = require('mongoose');
const { Schema } = mongoose
const { model } = mongoose

const ProfileModel = new Schema({
    userName: {
        type: String,
    },
   isKid:{
       type:Boolean,
       default :false
   },
    avatar:{
        type:String,
    },
    userName:{
        type:String
    }
})


module.exports = model('UserProfile', ProfileModel)