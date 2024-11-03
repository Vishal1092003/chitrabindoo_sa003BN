const jwt=require("jsonwebtoken") 
require("dotenv").config();
const User=require("../models/User")

/*---------------------------auth=>verify the json web to token---------------------------------------------*/
exports.auth=async(req,res,next)=>{
   try{
    //extract token
    const token=req.cookies.token ||
                req.body.token || 
                req.header("Authorisation").replace("Bearer ","");
     if(!token){
        return res.status(403).json({
            success:false,
            message:"Token is Missing"
        })
    }
    //verify Token
    try{
     const decode=await jwt.verify(token,process.env.jwt_secret);
     console.log(decode);
       req.User=decode;
    }catch(error){
        return res.status(403).json({
            success: false,
            message: "Token is Invalid"
        })
    }
    next();
   }catch(error){
       return res.status(403).json({
           success: false,
           message: "something went wrong while validating the token"
       })
   }
}
