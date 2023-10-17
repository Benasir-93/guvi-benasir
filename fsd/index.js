import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";

// import { dataBaseConnection } from 'db.js';
//config env variables
dotenv.config();

//server setup
const app=express();
const PORT=process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send({message:"working good"})
});
//db connection
 dataBaseConnection();
function dataBaseConnection(){
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
// listen the server
app.listen(PORT,()=>{
    console.log(`server is running on PORT :${PORT}`);
})