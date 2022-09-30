const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const VerifyToken =async (req,res,next)=>{
    const token = req.cookies.jwTtoken
    try {
        if(!token){
            return res.status(404).json({error:"you are not authorized"})
        }
     const verifyuser = jwt.verify(token,process.env.SEC_KEY);
     if(!verifyuser){
        return res.status(404).json({error:"you are not authorized"})
     }

     const user = await User.findById(verifyuser.id);
     if(user){
        req.user = user 
        next();
     }else{
        return res.status(404).json({error:"you are not authorized"})
     } 
     
    } catch (error) {
        console.log('error'+error)
    }
}


module.exports = VerifyToken ;