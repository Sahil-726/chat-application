const conversationDatabase=require("../models/conversationModel.js")
const messageDatabase=require("../models/messageModel.js")
const sendMessage= async(req,res)=>{
    try{
        const senderId=req.id
        const receiverId=req.params.id
        const {message}=req.body
        let  gotConversationPage=await conversationDatabase.findOne({
           participants:{$all :[senderId, receiverId]}
        })
        if(!gotConversationPage){
             gotConversationPage=await conversationDatabase.create({
                participants:[senderId,receiverId]
             })
        }
        const newMessage=await messageDatabase.create({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            gotConversationPage.message.push(newMessage._id)
        }
        await gotConversationPage.save()
        res.status(200).json({newMessage})

    }catch(error){
        console.log(error)
    }
}
const getMessage=async (req, res)=>{
    try{
       const receiverId=req.params.id
       const senderId=req.id
       const conversationPage=await conversationDatabase.findOne({
        participants:{$all:[receiverId,senderId]}
       }).populate("message")
       return res.status(200).json(conversationPage)
    }catch(error){
        console.log(error)
    }
}
module.exports={sendMessage,getMessage}
