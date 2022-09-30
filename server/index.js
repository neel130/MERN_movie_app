const express = require('express');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();
const connectMongoDB = require('./mongoDB/connection');
connectMongoDB();
const Port = process.env.PORT || 5000 ;
const app = express();


// MIDDLEWARE 
app.use(express.json());
app.use(cookieParser());


// importing Routes 
const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const movieRoute = require("./route/movieRoute");
const listRoute = require("./route/listRoute");


// Route 
app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/movie",movieRoute);
app.use("/list",listRoute);



app.listen(Port,()=>{
    console.log("server is running on port"+Port)
})