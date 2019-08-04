const express = require("express")
const bodyparser = require("body-parser")
const session= require("express-session")
// aded fpor cookie parser
const cookieparser= require("cookie-parser")
const app = express()
const mongoose = require("mongoose")
const {User} = require("./user.js")
const hbs= require("hbs")





mongoose.Promise= global.Promise;


mongoose.connect("mongodb://localhost:27017/user",{
    useNewUrlParse: true
})



const urlencoder = bodyparser.urlencoded({
    extended: false  
    
 
})

app.use(cookieparser())

app.use(express.static(__dirname+"/public"))
app.use(session({
    //close server delete all sessions
    secret : "secret name",
    
    // saves
    resave : true,
    // false in igocnigito
    saveUninitialized : true,
    // name of cookie
    name: "cookie monster",
    cookie : {
       
        maxAge: 1000*60*60*24*365*2
      
        
    }
    
}))



app.get("/", function(req,res){
    let fontsize = 12
      
        if(req.cookies.elmo){
            fontsize= req.cookies.elmo
            
        }
  
    
    if(req.session.username){
        
        
    
      res.render("home.hbs",{
        username: req.session.username
      })
  }
    else{
        res.sendFile(__dirname+"/public/login.html")
    }
    
})

app.get("/registeraccount", function(req,res){
    res.sendFile(__dirname+"/public/signup.html")
    
    
})

app.post("/login", urlencoder, function(req, res){
  
   let username= req.body.un   
   let password= req.body.pw
   
   User.findOne({
       username : username,
       password : password
       
       
       
   }, (err, doc)=>{
       
       if(err){
           res.send(err)
       }else if(!doc){
           res.send("User does not exist")
       }
       else{
           
           req.session.username = doc.username
           res.redirect("/")
       }
       
   })
   
   
  
  
})

app.post("/register", urlencoder, function(req,res){
         let username = req.body.un
         let password = req.body.pw
         
         let user = new User({
        
               username : username,
         password : password
   
         
         
         
         })
         user.save().then((doc)=>{
             
             console.log(doc)
             req.session.username=doc.username
             
             res.redirect("/")
             
             
             
         }, (err)=>{
            
             res.send(err)
             
             
         })
   
         
         })

app.get("/Logout", function(req,res){
    
    
    req.session.username = null
    
    res.redirect("/")
})
app.post("/add", urlencoder, (req,res)=>{
     console.log("POST /add")
    let username = req.body.un 
    let password = req.body.pw 
    // redirect isntad of res.send admin hbs....
    let user = new User({
        username, password
    })
    
    
    user.save().then((doc)=>{
       res.redirect("/users")
        
    },  (err)=> {
        res.send(err)
        
    })
    
})



app.listen(3000, function(){
    
    console.log("live at port 3000")
})