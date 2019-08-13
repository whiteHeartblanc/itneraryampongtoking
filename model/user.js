const mongoose= require("mongoose")
var Schema = mongoose.Schema;

var User = mongoose.model("user", {
    username : String,
    password : String, 
    email : String,

    list :[{type : Schema.Types.ObjectId, ref: 'list'}]
    
    
})




module.exports={
    User
    
}