const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
//const TOKEN=process.env.TOKEN;
//log each request
function logRequest(req,res,next) {
    console.log(`Received ${req.method} request for ${req.url} at ${new Date().toISOString()}`);

next();
}
// sample authentication

function sampleAuthentication (req,res,next){
    if (req.query.token==="mentorToken"){
        req.user={id:1,name:"mani"}
        next();
    }
    else if (req.query.token===process.env.TOKEN){
        req.user={id:2,name:"jack"}
        next();
}else{
    res.status(401).send("unauthorized !!")
}
}

app.use(bodyParser.json()); // For parsing JSON bodies
app.use(logRequest);
app.use("/secure",sampleAuthentication);

app.get("/secure/profile",(req,res)=>{
    res.send(`hello ${req.user.name}`)
});

app.get('/mentor',(req,res)=>{
    res.send('hello mentor')
})

app.get('/student',(req,res)=>{
    res.send('hello student')
})
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });