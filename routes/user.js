const express = require("express");
const router = express.Router();

const {login , signup }= require("../Controllers/Auth")
const {auth , isStudent , isAdmin}  = require("../middlewares/auth")

router.post("/login" , login)
router.post("/signup" , signup)

router.get("/test" , auth , (req ,res) =>{
    res.json({
        success : true ,
        message : 'welcome to the protected route for test'
    })
})

//protected path 
router.get("/student" , auth , isStudent , (req,res ) => {
    res.json({
        success : true ,
        message : 'welcome to the protected route for student'
    })
})
router.get("/admin" , auth , isAdmin , (req,res ) => {
    res.json({
        success : true ,
        message : 'welcome to the protected route for admin'
    })
})

console.log("login:", login);
console.log("signup:", signup);
console.log("auth:", auth);
console.log("isStudent:", isStudent);
console.log("isAdmin:", isAdmin);


module.exports = router ;

