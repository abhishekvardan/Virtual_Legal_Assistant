
const mongoose = require("mongoose");
const userSchema=mongoose.Schema({
    username:String,
    age:Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})
const User=mongoose.model("User",userSchema);
module.exports=User;