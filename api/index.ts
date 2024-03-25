const express = require('express')
const cors = require('cors')
const mongose = require('mongoose')
const userRouter = require('./routes/userRoutes')
require("dotenv").config()


const app = express()

app.use(cors())
app.use(express.json())




// app.use('/api/auth',userRouter)
// app.use('/api/messages',messageRouter)

mongose.connect(process.env.MONGO_URL,{
  
}).then(()=>{
    console.log('mongodb connected');
}).catch((err:any)=>{
    console.log(err.message);
})


const  server = app.listen(process.env.PORT, ()=>{
    console.log(`server running on port${process.env.PORT}`);
});
