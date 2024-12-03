const express=require("express")
const isAuthenticated=require("../middleware/isAuthenticated.js")
const {sendMessage, getMessage}=require("../controllers/messageController.js")
const router=express.Router()
router.post("/send/:id",isAuthenticated,sendMessage)
router.get("/:id",isAuthenticated,getMessage)
module.exports=router
