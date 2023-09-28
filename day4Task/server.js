const express= require('express');
const bodyParser= require('body-parser');
const mongoose=require('mongoose');

const app=express();
const DB_URL='mongodb://0.0.0.0:27017/admin'
const PORT =3000;

app.use(bodyParser.json());// for parsing json

//define schema for student
const studentSchema=new mongoose.Schema({
    id:Number,
    studentName:String,
    class:String,
    mentor:String
});

const student=mongoose.model('student',studentSchema);
//connect mongodb
mongoose.connect(DB_URL,{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("mongodb connected successfully"))
.catch((err)=>console.log("could not connect"));


//post method
app.post('/student',async(req,res)=>{
    const studentInfo=new student (req.body);
    try{
        const savedInStudent=await studentInfo.save();
        res.status(200).send(savedInStudent)
       }
    catch(err){
         res.status(400).send(err.message)
    }
});

    //get method
    app.get('/getStudent',async(req,res)=>{
        try{
            const getinfo=await student.find();
            res.status(200).send(getinfo)

        }
        catch(err){
             res.status(400).send(err.message)
        }
    });

    //get by id
    app.get('/student/:id',async(req,res)=>{
        try{
            const getId=await student.findById(req.params.id);
            if (getId) {
                res.status(201).send(getId);
              } else {
                res.status(404).send("id not found!!");
              }
        }
        catch(err){
             res.status(400).send(err.message)
        }
    });
//update 
    app.put("/student/:id", async (req, res) => {
        try {
          const getId = await student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          if (getId) {
            res.status(201).send(getId);
          } else {
            res.status(404).send("student info not found!!");
          }
        } catch (err) {
          res.status(400).send(err.message);
        }
      });
      // delete
      app.delete("/student/:id", async (req, res) => {
        try {
          const getId = await student.findByIdAndDelete(req.params.id);
          if (getId) {
            res.status(201).send({ message: "student detail deleted successfully!" });
          } else {
            res.status(404).send("Book not found!!");
          }
        } catch (err) {
          res.status(400).send(err.message);
        }
      });

app.get('/',(req,res)=>{
    res.status(200).send("welcome to port")
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})