const mongoose = require('mongoose')

const connectMongoDB = ()=>{
   mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
   });

   mongoose.connection.once("open",()=>{
    console.log("mongoDB Connected")
})

   mongoose.connection.on("error",(error)=>{
    console.log("error"+ error)
})
}


module.exports = connectMongoDB ;