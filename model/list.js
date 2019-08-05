const mongoose= require("mongoose")


var List = mongoose.model("list", {
    name: String,
    date: string,
    user: [{type : Schema.Types.ObjectId, ref: 'user'}]
   
    
    
    
})




module.exports={
    List
    
}