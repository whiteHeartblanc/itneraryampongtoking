const mongoose= require("mongoose")


var Item = mongoose.model("item", {
    name: String,
    type: String,
    order: int,
    start: String,
    end: String,
    list :[{type : Schema.Types.ObjectId, ref: 'lists'}]
    
   
    
    
    
})




module.exports={
    Item
    
}