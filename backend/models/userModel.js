const mongoose=require("mongoose")

//Creating Schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    age:{
        type:Number,
    },
},{timestamps:true})
//Creating Model
const User=mongoose.model('User',userSchema)
module.exports=User;