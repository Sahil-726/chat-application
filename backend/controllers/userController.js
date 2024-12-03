const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()
const userDatabase=require("../models/userModel.js")
const bcrypt=require("bcryptjs")
 

const register= async (req, res)=>{
    try{
        const {username, fullname, password, confirmPassword, gender}=req.body;
        if(!username || !fullname || ! password || !confirmPassword || !gender){
            return res.status(400).json({message:"All fields are neccessary.."})
        }
        if(password!=confirmPassword){
            return res.status(400).json({message:"Password not matched"})
        }
        const user=await userDatabase.findOne({username})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        // const profileImage=`https://i.pravatar.cc/300?username=${username}`
        const profileImageMale="https://xsgames.co/randomusers/avatar.php?g=male"
        const profileImageFemale="https://xsgames.co/randomusers/avatar.php?g=female"



        await userDatabase.create({
            fullname,
            username,
            password:hashedPassword,
            profilePhoto:(gender==="male")?profileImageMale:profileImageFemale,
            gender
        })
        return res.status(201).json({message:"Account Created Successfully ", success:true})
    }catch(err){
        console.log(err)
    }
}


const login=async(req, res)=>{
    try{
        const {username ,password}=req.body
        if(!username || !password){
            return res.status(400).json({
                message:"Please fill all the details in order to login",
                success:false
            })
        }
        const user=await userDatabase.findOne({username})
        if(!user){
            return res.status(400).json({
                message:"Username or Password not matched",
                success:false
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Username or Password not matched",
                success:false
            })
        }
        const payload={
            ID:user._id
        }
        const token= await jwt.sign(payload,process.env.secretKey)
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000}).json({
            message:"User successfully login and authenticated (data Stored in browser)",
            Id:user._id,
            username:user.username,
            fullname:user.fullname,
            profilePhoto:user.profilePhoto
        })
    }catch(err){
        console.log("Error:",err)
    }
}
const logout=(req, res)=>{
   try{
     res.status(200).cookie("token","",{maxAge:0}).json({
        message:"User successfully logout",
        success:true
     })
   }catch(err){
    console.log("Error:",err)
   }
}

const getOtherUser= async(req, res)=>{
    try{
        const loggedInUserId=req.id
        const otherUsers= await userDatabase.find({_id: {$ne:loggedInUserId}}).select("-password")
        return res.status(200).json(otherUsers)
    }catch(err){
        console.log(err)
    }
}

module.exports={register,login,logout,getOtherUser}
