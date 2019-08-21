const mongoose= require("mongoose")
var Schema = mongoose.Schema;

var List = mongoose.model("list", {
    name: String,
    date: Date,
    item: [{type:String}]
   
    
    
    
})




module.exports={
    List
    
}