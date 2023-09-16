const express= require("express");
const bodyParser= require("body-parser");

const app= express();
const PORT=3000;
app.use(bodyParser.json())//for parsing json bodies

let items=[
    {id:1,name:"item1"},
    {id:2,name:"item2"},
]

app.get('/getItems',(req,res)=>{
res.json(items)
})

app.post('/items',(req,res)=>{
    const newItem=req.body;
    if(!newItem.id||!newItem.name){
return res.status(500).send("items must have an id and name")
    }
    items.push(newItem);
    res.status(201).send(`items added with id:${newItem.id}`)
});

app.put('/items/:id',(req,res)=>{
const itemId= parseInt(req.params.id);
const updatedItem = req.body;

const index=items.findIndex((item)=>item.id===itemId);
if(index === -1){
    return res.status(400).send("item not found")
}

if (!updatedItem.name){
    return  res.status(500).send("item must have a name")
}

items[index].name=updatedItem.name;
res.status(201).send(`items updated with id:${itemId}`)
});

app.delete('/items/:id',(req,res)=>{
    const itemId= parseInt(req.params.id);
    
    const index=items.findIndex((item)=>item.id===itemId);
    if(index === -1){
        return res.status(400).send("item not found")
    }
    
    
    items.splice(index,1)
    res.status(204).send(`items updated with id:${itemId}`)
    });



app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})