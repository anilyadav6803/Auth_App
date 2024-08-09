const express = require("express");
const app = express();


require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(express.json());

const cookieParser = require("cookie-parser")
app.use(cookieParser);
require("./config/database").connect();

//rpute import

const user = require("./routes/user");
app.use("/api/v1" , user);


app.listen( PORT , ()=>{
    console.log(`Port is listen at ${PORT}`)
})


app.get('/' , (req,res) =>{
    res.send("this is you home page ")
})