const mongoose= require("mongoose")
const conversationSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDatabase"
    }],
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"messageDatabase"
    }]
},{timeStamps:true})
module.exports=mongoose.model("conversationDatabase", conversationSchema)

