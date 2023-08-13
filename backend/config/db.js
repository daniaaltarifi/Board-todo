const mongoose=require('mongoose');
const connecDB=async ()=>{
    try {
        const connect=mongoose.connect(process.env.MONGO_URI)
        console.log("connect to DB")
    } catch (error) {
        console.log(`ERROR${error.message}`)
    }
}
module.exports=connecDB