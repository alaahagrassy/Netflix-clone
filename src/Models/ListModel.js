const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        type:{
            type:String,
        },
        genre:{
            type:String,
        },
        MovieId:{
            type: mongoose.Schema.Types.Array,ref:'movie',
        },
    }
)
module.exports= mongoose.model("List" , ListSchema);