const User = require("../model/userSchema");

// UPDATE USER 
exports.updateUser = async(req,res) =>{
    const id = req.params.id;
    const {name} = req.body ;
    try {
        if(!id || !name){
            return res.status(404).json({error:"error fields require"})
        }
        if(id != req.user._id){
            return res.status(400).json({error:"You cannot update your profile"})
        }
        const updateUser = await User.findByIdAndUpdate(id,{
            $set:{
                name
            }
        },{
            new:true
        });

        return res.status(200).json({success:"user update successful",user:updateUser})
    } catch (error) {
        console.log("error"+error)
    }
}