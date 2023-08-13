const mongoose=require('mongoose');
const addNewTask=require('../models/addNewTaskModels.js')
require('dotenv').config();
// const addTask= async (req,res)=>{
// const {title,description,subTasks,status}=req.body;
// addNewTask.create({title,description,subTasks,status})
// .then((task)=>{
//     res.json(task)
// }
// ).catch((error)=>{
//     res.json(`error in backend ${error}`)
// })
// }
const addTask = async (req, res) => {
  try {
    const { title, description, subTasks, status } = req.body;

    const newTask = new addNewTask({
      title,
      description,
      subTasks,
      status,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'An error occurred while creating the task.' });
  }
};

const updateTask = (req, res) => {
    let _id = req.params._id;
    addNewTask.findById({ _id }).then((update) => {
      update.title = req.body.title;
      update.description = req.body.description;
      update.subTasks = req.body.subTasks;
      update.status = req.body.status;
      update
        .save()
        .then(() => {
          res.json("task updated");
          
        })
        .catch((err)=>res.status(404).json('Error'+err))
  
        .catch((error) => {
          res.json(`error in updateTask backend ${error.response}`);
        });
    });
  };
module.exports={addTask,updateTask}