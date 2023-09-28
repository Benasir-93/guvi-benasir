// const express=require('express');
// const bodyParser=require('body-parser');
// const mongoose=require('mongoose');

// const app=express();
// const PORT =3000;
// const DB_URL="mongodb://0.0.0.0:27017/admin";

// app.use(bodyParser.json());

// //define schema
// const userSchema= new mongoose.Schema({
//     name:String,
//     age:Number,
// });

// const user=mongoose.model('user',userSchema);

// // connect to mongodb

// mongoose
// .connect(DB_URL,{})
// .then(()=>console.log('connected to mongoosedb'))
// .catch((err)=>console.log('could not connect'))

// app.get('/',(req,res)=>{
//     res.status(200).send('hello all!!')
// })
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`)
// })
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const DB_URL = 'mongodb://0.0.0.0:27017/products1'; // Replace 'your_database_name' with your actual database name

app.use(bodyParser.json());

// Define schema
const userSchema = new mongoose.Schema({
    // name: String,
    // age: Number,
    product_name:String,
    product_price:Number,

});

// const User = mongoose.model('user', userSchema);
const products = mongoose.model('products1', userSchema);//collection name is products1


// Connect to MongoDB
mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

//post method
    app.post('/product',async(req,res)=>{
        const product=new products (req.body);
        try{
            const savedProduct=await product.save();
            res.status(200).send(savedProduct)

        }
        catch(err){
res.status(400).send(err.message)
        }
    });

    //get method
    app.get('/getproduct',async(req,res)=>{
        try{
            const getProducts=await products.find();
            res.status(200).send(getProducts)

        }
        catch(err){
res.status(400).send(err.message)
        }
    });

//////////////////////////
app.get("/book/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (book) {
        res.status(201).send(book);
      } else {
        res.status(404).send("Book not found!!");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
  app.put("/book/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (book) {
        res.status(201).send(book);
      } else {
        res.status(404).send("Book not found!!");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
  app.delete("/book/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (book) {
        res.status(201).send({ message: "Book deleted successfully!" });
      } else {
        res.status(404).send("Book not found!!");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
app.get('/', (req, res) => {
    res.status(200).send('Hello all!!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
