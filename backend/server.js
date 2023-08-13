const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors')
const connectDB=require('./config/db.js')
const taskRouter=require('./routes/addTask.js')
const app=express();
app.use(express.json())
app.use(cors())
require('dotenv').config()
connectDB();
app.use('/task',taskRouter)
//server listen to port 5001
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})