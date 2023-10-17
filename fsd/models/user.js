import mongoose from "mongoose";

const userSchema= new mongoose.userSchema({
username:{
    type:String,
    required:true,
    trim:true,
    maxlength:32
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true
},
password:{
    type:String,
    required:true,
    trim:true,
}

});
const User =mongoose.model("user",userSchema)

export {User}