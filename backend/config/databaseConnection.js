const mongoose=require("mongoose")
const connectDB= async ()=>{
    try{await mongoose.connect("mongodb://localhost:27017/Chat_Application")
    console.log("Database connected Successfully")
    }catch(err){
        console.log(err)
    }
}
module.exports=connectDB
