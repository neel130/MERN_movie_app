const List = require("../model/listSchema");

// CREATING LIST 
exports.createList = async(req,res)=>{
  const {title,type,category,content} = req.body;
    try {
        if(!title || !type || !category || !content){
            return res.status(400).json({error:"all fields required"});
        }

        const list = await List.create({
            title,
            type,
            category,
            content
        });
        if(list){
            return res.status(200).json({success:"list creating successful",list})
        }
        
    } catch (error) {
        console.log("error"+error)
    }
}


// GETTING ALL LIST 
exports.getAllList = async(req,res) =>{
    const category = req.query.cat;
    const type = req.query.type;
    try {
       let list ;
       if(category){
        list = await List.find({category});
        if(type){
            list = await List.find({$and:[{category},{type}]});
        }}
       else{
        list = await List.find();
       }
         return res.status(201).json({success:"getting all list successful",list});    
    } catch (error) {
        console.log('error'+error)
    }
}


// GETTING SINGLE LIST 
exports.getSingleList = async(req,res) =>{
    const id = req.params.id
    try {
        if(!id){
            return res.status(404).json({error:"id is required"})
        }
        const singleList = await List.findById(id);
        if(singleList){
            return res.status(200).json({success:"single list getting successful",singleList})
        }
        
    } catch (error) {
        console.log("error"+error)
    }
};


// UPDATE LIST
exports.updateList = async (req,res) =>{
    const id = req.params.id;
    const {title,type,category,content} = req.body ;
    try {
        if(!id){
            return res.status(404).json({error:"id is required"});
        }

        const updateList = await List.findByIdAndUpdate(id,{
            $set:{
                title,
                type,
                category,
                content
            }
        },{
            new:true
        });

        if(updateList){
            return res.status(201).json({success:"update successful",updateList})
        }
        
    } catch (error) {
       console.log("error"+error) 
    }
}