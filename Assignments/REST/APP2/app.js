const express = require('express');
const axios = require('axios');
  
const app = express();
const PORT = 3001;
  

app.get("/",async(req,resp)=>{

    data = ""
    console.log("Welcome to app2");
    axios.post("http://localhost:3000/",{'num1':12,'num2':21}).then(resp => {
        console.log(resp.data);
        data = resp.data;
    });

    
    console.log(data);

    resp.status(200).send(resp.data);
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);