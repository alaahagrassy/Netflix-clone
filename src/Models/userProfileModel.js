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
        default: "https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png"
    },
    userName:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,ref:'User',
    }
})


module.exports = model('UserProfile', ProfileModel)