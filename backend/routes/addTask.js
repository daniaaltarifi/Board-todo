const router=require('express').Router()
const mongoose=require('mongoose');
require('dotenv').config();
const addNewTask=require('../models/addNewTaskModels.js');
const {addTask,updateTask}=require('../controller/addNewTaskController.js')
router.route('/').post(addTask)
router.route('/update/:_id').patch(updateTask)
module.exports=router