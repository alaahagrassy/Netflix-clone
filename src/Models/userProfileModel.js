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
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,ref:'User',
    }
})


module.exports = model('UserProfile', ProfileModel)