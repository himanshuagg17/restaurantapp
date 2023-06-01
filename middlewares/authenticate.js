const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const authenticate=async(req,res,next)=>{
    let token=req.headers.authorization;

    if(token){
       let result= jwt.verify(token,"himanshu");

       if(result){
        res.body.userId=result.userId;
        next();
       }
       else{
        res.send("login again");
       }
    }
}


module.exports={
    authenticate
}