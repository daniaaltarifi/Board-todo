const mongoose=require('mongoose');
const addTaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true, 
    },
    subTasks:{
        type:String,
        required:true, 
    },
    status:{
        type:String,
        enum:['todo','doing','done'],
        required:true, 
    },

},{timestamps:true})
const addNewTask=mongoose.model("addNewTask",addTaskSchema)
module.exports=addNewTask