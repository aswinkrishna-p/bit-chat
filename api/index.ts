const express = require('express')
const cors = require('cors')
const mongose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const messageRouter = require('./routes/messageRoutes')
const socket = require('socket.io')
require("dotenv").config()


const app = express()

app.use(cors())
app.use(express.json())




app.use('/api/auth',userRouter)
app.use('/api/messages',messageRouter)

mongose.connect(process.env.MONGO_URL,{
  
}).then(()=>{
    console.log('mongodb connected');
}).catch((err:any)=>{
    console.log(err.message);
})


const  server = app.listen(process.env.PORT, ()=>{
    console.log(`server running on port${process.env.PORT}`);
});


const io = socket(server ,{
    cors:{
        origin:"http://localhost:3000",
        Credential:true
    }
})

global.onlineUsers = new Map();

io.on("connection",(socket) =>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId,socket.id)
    } );
    
    socket.on("send-msg", (data) =>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receieved",data.message)
        }
    })
})