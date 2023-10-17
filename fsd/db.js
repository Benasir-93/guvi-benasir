import mongoose from "mongoose";
 export function dataBaseConnection(){
    const params={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try{
        mongoose.connect(process.env.MONGO_URL,params);
        console.log("mongo db connected successfully !!");
    }catch(error){
console.log("db not connected",error);
    }
 }