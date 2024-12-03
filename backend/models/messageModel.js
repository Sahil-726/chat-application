const mongoose=require("mongoose")
const messageSchema= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDatabase",
        required:true

    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDatabase",
        required:true
    },
    message:{
        type:String,
        req:true
    }
},{timeStamps:true})
module.exports=mongoose.model("messageDatabase", messageSchema)
