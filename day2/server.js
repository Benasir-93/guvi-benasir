const express=require ("express");
const path=require ("path");
const fs=require ("fs");
const app=express();

const outputFolder= "./output";
if(!fs.existsSync(outputFolder)){
fs.mkdirSync(outputFolder)
}

const PORT = 3000;

app.get("/createFile",(req,res)=>{
    const currentTime=new Date();
    const year=currentTime.getFullYear().toString();
    const month=(currentTime.getMonth()+1).toString();
    const date=currentTime.getDate().toString();
    const hrs=currentTime.getHours().toString();
    const mins=currentTime.getMinutes().toString();
    const secs=currentTime.getSeconds().toString();

    const dateTimeForFileName=`${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`

    const filePath=path.join(outputFolder,dateTimeForFileName);

    fs.writeFile(filePath,currentTime.toISOString(),(err)=>{
        if(err){
            res.status(500).send(`error creating file ${err}`);
            return;
        }   
    res.send(`file created successfully at ${filePath}`)
    })
}) ;

app.get("/getfiles",(req,res)=>{
    fs.readdir(outputFolder,(err,files)=>{
        if(err){
            res.status(500).send(`error creating file ${err}`);
            return;
        }  
        const textFiles=files.filter((file)=>path.extname(file)===".txt");
        console.log(" list of text files:",textFiles)
        res.json(textFiles)
    })

})
app.listen(PORT,()=>{
console.log("Server is running on port" ,PORT);
});