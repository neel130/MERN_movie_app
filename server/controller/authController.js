const bcrypt = require('bcryptjs');
const User = require('../model/userSchema');
const jwt = require("jsonwebtoken")

// SIGNUP 
exports.SignUp = async(req,res) =>{
    const {name,email,password} = req.body
    try {
        if(!name || !email || !password){
            return res.status(404).json({error:"require all fields"});
        }
        const savedUser = await User.findOne({email});
        if(savedUser){
            return res.status(404).json({error:"email already exist"})
        }
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        name,
        email,
        password:hashedPassword
      })

      return res.status(200).json({success:"creating new user successful",user})
        
    } catch (error) {
        console.log("error"+error)
    }
}


// LOGIN 
exports.LogIn = async (req,res) =>{
    const {email,password} = req.body ;
    try {
        if(!email || !password){
            return res.status(400).json({error:"require all fileds"});
        }
        const savedUser = await User.findOne({email});
        if(!savedUser){
            return res.status(400).json({error:"no user found"});
        }

        const matchPassword = bcrypt.compareSync(password, savedUser.password);
        if(!matchPassword){
            return res.status(400).json({error:"incorrect Password"})
        }

        const AccessToken = jwt.sign({id:savedUser._id},process.env.SEC_KEY,
            {
                expiresIn:"7d"
            });

            delete savedUser._doc.password

        return res.cookie("jwTtoken",AccessToken).
        status(200).json({success:"login successful",user:savedUser})



    } catch (error) {
        console.log("error"+error)
    }
}