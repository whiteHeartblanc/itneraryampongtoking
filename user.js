const mongoose= require("mongoose")

// user= document name
// the one after document schema (username, password) 
var User = mongoose.model("user", {
    username : String,
    password : String
    
    
    
})




module.exports={
    User
    
}