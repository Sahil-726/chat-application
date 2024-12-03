const express=require("express")
const app=express()
const registerRoute=require("./routers/registerRoute.js")
const messageRoute=require("./routers/messageRoute.js")
const dotenv=require("dotenv").config()
const connectDB=require("./config/databaseConnection.js")
const cookieParser=require("cookie-parser")
const cors=require("cors")

connectDB()
const port=process.env.Port
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
const corsOption={
    origin:"http://localhost:3000",
    credentials:true,
}
app.use(cors(corsOption))
app.use("/api/v1/user", registerRoute)
app.use("/api/v1/message",messageRoute)

app.listen(port, ()=>{
    console.log(`Server Started successfully... at port ${port}` )
})
