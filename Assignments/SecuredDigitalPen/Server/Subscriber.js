// // Program to publish data to Broker on TOPIC

// // Importing required modules
// const { response } = require("express");
// const express = require("express");
// const app=express()

// const topicDB = [{"Kavtya":"abcde"},
//                 {"Rohit":"xyzef"},
//                 {"Amit":"pqrst"},
//                 {"Neha":"ebkso"}]

// // ----------------------------------------------------------------

// const HOST = 'mqtt://localhost:';
// const PORT = '1883';

// // function sendData(data,uname)
// // {
// // }
// // Handling get request from the client side
// app.get("/",(req,res,next)=>{

//         //----------------------------------------------------------------
       
//         const subscriber = mqtt.connect(HOST + PORT,{
//             protocolId:"MQTT",
//             protocolVersion:4,
//             username:'diot',
//             password:'diot',
//             clean:false,
//             clientId:"diot003",
//             qos:2
//         });

//         // MQTT Topic to Publish data to


//         // USER = user

//         const TOPIC = 'cdac/rohit/' + ;



//         const WILL_TOPIC = "cdac/device/dead"

//         // Event to Check BROKER connection
//         subscriber.on('connect',()=>{
            
//             console.log("Connected to MQTT Broker!");

//             // Publish the data
//             subscriber.subscribe([TOPIC],{qos:1}, (err, granted)=>{
//                 if(!err){
//                     // console.log(`Granted. Topic: ${granted[0].topic}, QoS: ${granted[0].qos}`);
//                 }
//             });
//         })

//         subscriber.on('message',(topic,data)=>{
//             console.log(`${data.toString()}`);

//             res.send(data.toString())
        
//         })


// })
// app.listen(3000,()=>{
// console.log("Server is starting")
// })
