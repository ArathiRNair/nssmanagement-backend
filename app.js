const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://arathir:arathirnair@ac-g0cyi5b-shard-00-00.egyqa6b.mongodb.net:27017,ac-g0cyi5b-shard-00-01.egyqa6b.mongodb.net:27017,ac-g0cyi5b-shard-00-02.egyqa6b.mongodb.net:27017/nssdb?ssl=true&replicaSet=atlas-89qct9-shard-0&authSource=admin&appName=Cluster0").then(
    ()=>{
        console.log("MongoDb connected")
    }
).catch(
    (error)=>{
        console.log("error")
    }
)

const nss=mongoose.model("NSS",new mongoose.Schema(
  {
    volunteerid:String,
    fullname:String,
    email:String,
    phone:String,
    dateofbirth:String,
    gender:String,
    bloodgroup:String,
    department:String,
    yearofstudy:String,
    campname:String,
    hourscompleted:String,
    address:String,
    unitnumber:String,
  }  
))

app.post("/add-entry",async(req,res)=>{
    await nss.create(req.body)
    res.json({"status":"success"})
})

app.post("/view-entry",async(req,res)=>{
    const Nss=await nss.find()
    res.json(Nss)
})
app.listen(3000,()=>{
    console.log("server started")
})