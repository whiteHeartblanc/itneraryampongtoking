const mongoose= require("mongoose")


var Item = mongoose.model("item", {
    name: String,
    type: String,
    order: Number,
    start: String,
    end: String,
    
    
   
    
    
    
})




module.exports={
    Item
    
}