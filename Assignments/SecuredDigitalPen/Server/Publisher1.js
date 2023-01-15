let myfile = require("fs");

// Program to publish data to Broker on TOPIC
const mqtt = require('mqtt');

const HOST = 'mqtt://localhost:';
const PORT = '1883';


USER = "abcde"         // System generated random key which will be stored in DB.

const TOPIC = 'cdac/rohit/' + USER;


// Read file data
myfile.readFile("User1data.txt",(err,data)=>{
    if(err)     console.log(err.message);
    else
    {
        // user1data.concat(data.toString());
        displayData(data.toString());
        // console.log("abc: ",data.toString());
    }
})

function displayData(data)
{


    const publisher = mqtt.connect(HOST + PORT,{
        clean:false,
        clientId:"diot001",
        username:'diot',
        password:'diot',
        will:{
            topic:'cdac/device/dead',
            payload:'diot001',
            qos:2,
            retain:true            
        }    
    });

    publisher.on('connect',()=>{
    
        console.log("Connected to MQTT Broker!");
        
        publisher.publish(TOPIC,data,{
            qos : 2
        },(err)=>{
            if(!err)
            {            console.log("Message published");            }
            
        })


        publisher.end();

    })
    
//    console.log(data);
}


// Event to Check BROKER connection
