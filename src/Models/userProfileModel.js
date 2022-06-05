const mongoose = require('mongoose');
const { Schema } = mongoose
const { model } = mongoose

const ProfileModel = new Schema({
    userName: {
        type: String,
        required: [true, 'User Name is required'],
    },
   isKid:{
       type:Boolean
   },
    avatar:{
        type:String,
    },
})


module.exports = model('UserProfile', ProfileModel)