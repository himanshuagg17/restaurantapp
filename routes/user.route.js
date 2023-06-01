const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const {UserModel}=require("../models/user.model")
const UserRouter=express.Router();

UserRouter.post("/register",async(req,res)=>{
    let {name,email,password,address}=req.body;

    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            let user=new UserModel({name,email,password:hash,address:address});
            await user.save();
        
            res.send("The new user has been created");
        })
       
    }
    catch(err){
        res.send(err.message);
    }
    
})



// register the user

UserRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;

    let user=await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password,user[0].password,async(err,decoded)=>{
            if(err) res.send("password does not match");
            else if(decoded){
               let token= jwt.sign({userId:user[0]._id},"himanshu",{expiresIn:"7d"});

                res.send({"msg":"user signed in","token":token});
            }
        })
    }

})


module.exports={
    UserRouter
}