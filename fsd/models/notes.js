import mongoose from "mongoose";

const notesSchemaSchema= new mongoose.notesSchema({
companyname:{
    type:String,
    required:true,
   
},
role:{
    type:String,
    required:true,
   
},
package:{
    type:Number,
    required:true,
},
question:{
    type:String,
    required:true,
   
},
date:{
    type:String,
    required:true,
   
},

});
const Notes =mongoose.model("notes",notesSchema)

export {Notes}