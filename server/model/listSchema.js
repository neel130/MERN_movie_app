const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
       title:{
        type:String,
        require:true
       },
       type:{
        type:String,
        require:true
       },
       category:{
        type:String,
        require:true
       },
       content:{
        type:Array,
        require:true
       }
},{
    timestamps:true
}
);

const List = mongoose.model("list",listSchema);

module.exports = List;