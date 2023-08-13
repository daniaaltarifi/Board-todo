const mongoose=require('mongoose');
const addNewTask=require('./models/addNewTaskModels.js')
require('dotenv').config();
const connecDB=require('./config/db.js')
connecDB()
  const destroyData = async () => {
    try {
      await addNewTask.deleteMany();
    
      console.log("Data destroyed!");
      process.exit(0); // Exit the script with success code (0)
    } catch (error) {
      console.error(`${error}`);
      process.exit(1); // Exit the script with error code (1)
    }
  };
  
  
  if (process.argv[2] === '-d') {
    destroyData();
  } 