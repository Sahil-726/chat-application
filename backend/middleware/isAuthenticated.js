const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config()

const isAuthenticate=async(req, res, next)=>{
    try{
        const accessToken=req.cookies.token
        if(!accessToken){
            return res.status(401).json({
                message:"User not currently login ( as its token expires )",
                success:false
            })
        }
        const decode= await jwt.verify(accessToken,process.env.secretKey)
        if(!decode){
            return res.status(401).json({
                message:"Your token does not matched with browser saved token",
                success:false

            })
        }
        req.id=decode.ID
        next()
    }catch(err){
        console.log("Error:",err)
    }
}
module.exports=isAuthenticate
