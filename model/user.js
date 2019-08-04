const mongoose= require("mongoose")
var Schema = mongoose.Schema;
// user= document name
// the one after document schema (username, password) 
var User = mongoose.model("user", {
    username : String,
    password : String, 
    email : String,
    list :[{type : Schema.Types.ObjectId, ref: 'list'}]
    
    
    
})




module.exports={
    User
    
}