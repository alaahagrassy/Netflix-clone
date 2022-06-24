const mongoose = require('mongoose');
const { Schema } = mongoose
const { model } = mongoose

const ProfileModel = new Schema({
    userName: {
        type: String,
    },
   isKid:{
       type:Boolean
   },
    avatar:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,ref:'User',
    }
})


module.exports = model('UserProfile', ProfileModel)