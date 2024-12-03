const express=require("express")
const router=express.Router()
const isAuthenticated=require("../middleware/isAuthenticated.js")
const {register,login,logout,getOtherUser}=require("../controllers/userController.js")
router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/",isAuthenticated,getOtherUser)
module.exports=router
