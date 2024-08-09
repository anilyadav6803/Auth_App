

// auth , isStsudent , isAdamin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req , res , next)=>{
    try {
        //extract  jwt tokken from body or cookie or other element 
  const token = req.body.token || req.cookie.token || req.header("Aurthorization").replacee("Bearer" , "")

  if(!token){
    return res.status(400).json({
        success: false,
        message: "token not found",
      });
  }

  //verufy token

  try {
    const decode = jwt.verify(token , process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode
  } catch (error) {
    return res.status(400).json({
        success: false,
        message: "token is invalid",
      });
  }
  next();
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "something while wronng  to vedrify the token",
          }); 
    }
}

exports.isStudent = (req , res , next)=>{
   try {
    if(req.user.role ==! "student"){
        return res.status(400).json({
            success: false,
            message: "thus is protected route for student"
          }); 
          
    }
    next();
   } catch (error) {
    return res.status(400).json({
        success: false,
        message: "user role ia notmmactching"
      }); 
   }
}


exports.isAdmin = (req , res , next)=>{
    try {
     if(req.user.role ==! "Admin"){
         return res.status(400).json({
             success: false,
             message: "thus is protected route for Admin"
           }); 
           
     }
     next();
    } catch (error) {
     return res.status(400).json({
         success: false,
         message: "user role ia notmmactching"
       }); 
    }
 }
 