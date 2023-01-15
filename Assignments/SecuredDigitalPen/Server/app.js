/*
Develop a login app. The login.html must accept username and password and submit to
node. At server side, node must first check if password is minimum 6 characters. 
Create a Javascript array that contains username and password as comma separated values.
Enter 3 user details.
*/

// ----------------------- MQTT -----------------------------------------

USER = "USER_NAME"
myTopic = "TOPIC_NAME"

const mqtt = require('mqtt');

const topicDB = [{"uname":"User1","topic":"abcde"},
                {"uname":"Rohit"},
                {"uname":"Amit"},
                {"uname":"Neha"}]

const HOST = 'mqtt://localhost:';
const PORT = '1883';

// ----------------------- LOGIN -----------------------------------------

const myDb = require("./database")

const userDB = [{"uname":"User1","password":"password","topic":"abcde"},
             {"uname":"Rohit","password":"password","topic":"xyzer"},
             {"uname":"Amit","password":"password","topic":"pqrst"},
             {"uname":"Neha","password":"password","topic":"lmnop"}]

// ----------------------- Server -----------------------------------------

const ExpressJs = require("express");
const app =ExpressJs()

const body_parser = require("body-parser")
app.use(body_parser.urlencoded({extended: false}));

app.use(ExpressJs.json())

const { check, validationResult } = require("express-validator/src");


// ----------------------- Web Requests -----------------------------------------

app.get("/",(req,resp)=>{
    resp.sendFile("login.html",{root:__dirname});

    // console.log(myDb.getDb());

});

app.get("/register",(req,resp)=>{
    resp.sendFile("register.html",{root:__dirname});
});

app.get("/activate",(req,resp)=>{
    resp.sendFile("activate.html",{root:__dirname});
});

// ----------------------- Display data -----------------------------------------
app.get("/data",(req,resp)=>{
    resp.sendFile("data.html",{root:__dirname});

     //----------------------------------------------------------------
      

});


// ----------------------- Validate user -----------------------------------------

app.post("/validLogin",
[check("pwd").isLength({min:6})
            .withMessage("Password length should be more than 6 characters")]
,(req,resp)=>{

    let uname = req.body.uname;
    let password = req.body.pwd;
    let found = 0;

    const errors = validationResult(req);
 
    // If some error occurs, then this block of code will run

    if (!errors.isEmpty()) {
        resp.send(errors)
    }
    else   
    {
        for(user of userDB)
        {
            if(user.uname == uname)
            {
                if(user.password == password)
                {
                    found =1;
                    resp.redirect("/data")
    
                    myTopic = user.topic;
                    // USER = user.uname;

 
                const subscriber = mqtt.connect(HOST + PORT,{
                    protocolId:"MQTT",
                    protocolVersion:4,
                    username:'diot',
                    password:'diot',
                    clean:false,
                    clientId:"diot003",
                    qos:2
                });
            
                // MQTT Topic to Publish data to
            
            
                // USER = user
            
                const TOPIC = 'cdac/rohit/' + myTopic;
            
                console.log("Subscribed to: ",TOPIC);
            
                const WILL_TOPIC = "cdac/device/dead"
            
                // Event to Check BROKER connection
                subscriber.on('connect',()=>{
                    
                    console.log("Connected to MQTT Broker!");
            
                    // Publish the data
                    subscriber.subscribe([TOPIC],{qos:1}, (err, granted)=>{
                        if(!err){
                            // console.log(`Granted. Topic: ${granted[0].topic}, QoS: ${granted[0].qos}`);
                        }
                    });
                })
            
                subscriber.on('message',(topic,data)=>{
                    console.log(`${data.toString()}`);
                    // document.getElementById("dataDiv").innerHTML = data.toString();
                    // resp.send(data.toString());
                    if(typeof document !== "undefined")
                    {
                        document.getElementById("dataDiv").innerHTML = data.toString();
                    }
                    else
                    {
                        console.log("doc not found");
                        // resp.send(data.toString());
                    }
                })

                }
                else found =2;

                break;
            }
        }
        switch(found)
        {
            case 0:{
                resp.send("User not found");
                break;
            }
            case 1:{
                // resp.sendFile("data.html",{root:__dirname});

                // resp.redirect("/data")

                // abc = document.getElementById("dataDiv");
                // abc.innerHTML = "andsjd";
                break;
            }
            case 2:{
                resp.send("Invalid password");
                break;
            }
        }
    }
});

app.listen(1337,()=>{console.log("http://localhost:1337")})