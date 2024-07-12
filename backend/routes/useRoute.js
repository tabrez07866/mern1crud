const express = require("express");

const mongoose=require("mongoose")
const User=require("../models/userModel.js")

const router=express.Router();

router.post("/",async(req,res)=>{
    var {name,email,age}=req.body;

   
    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists with this email' });
        }

       const userAdded=await User.create({
           name:name,
           email:email,
           age:age,
        })
     return   res.status(201).json(userAdded)
       
    } catch (error) {
       console.log(error)
       res.sendStatus(400).json({error:error.message})

       if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    
})
   //get
router.get("/",async(req,res)=>{
try{
const showAll=await User.find()
return res.status(200).json(showAll)
}catch(error){
console.log(error)
res.sendStatus(400).json({error:error.message})
}
res.send("api running runing ")
})

//single user
router.get("/:id",async(req,res)=>{
   
    const {id}=req.params;
      // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }


    try{
    const singleUser=await User.findById({_id:id})
   return res.status(200).json(singleUser)
    }catch(error){
    console.log(error)
    res.sendStatus(400).json({error:error.message})
    }
    res.send("api running runing ")
    })

//delete
router.delete("/:id",async(req,res)=>{
   
    const {id}=req.params;

    try{
    const singleUser=await User.findByIdAndDelete({_id:id})
   return res.status(200).json(singleUser)
    }catch(error){
    console.log(error)
    res.sendStatus(400).json({error:error.message})
    }
    res.send("api running runing ")
    })

    //put patch (update)

router.patch("/:id",async(req,res)=>{
   
        const {id}=req.params;

        const {name,email,age}=req.body;
    
        try{
        const updateUser=await User.findByIdAndUpdate(id,req.body,{new:true,})
          return res.status(200).json(updateUser)
        }catch(error){
        console.log(error)
        res.sendStatus(400).json({error:error.message})
        }
        res.send("api running runing ")
        })


module.exports=router;