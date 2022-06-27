const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        desc:{
            type:String,
        },
        img:{
            type:String,
        },
        trailer:{
            type:String,
        },
        video:{
            type:String,
        },
        year:{
            type:String,
        },
        limit:{
            type:String,
        },
        genre:{
            type:[String]
        },
        isSeries:{
            type:Boolean,
            default:false
        },
        ContentRating:{
            type:String
        }
    }
)
module.exports= mongoose.model("movie" , movieSchema);