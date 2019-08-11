const express = require("express")
const bodyparser = require("body-parser")
const session= require("express-session")
// aded fpor cookie parser
const cookieparser= require("cookie-parser")
const app = express()
const mongoose = require("mongoose")
const {User} = require("./model/user.js")
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



app.get("/", function(req,res){

  
   // console.log(req.cookies.loggeduser)
    if(req.cookies.loggeduser){
        
        
    
      res.render("home.hbs",{
        username: req.cookies.loggeduser
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
           res.send("Something went wrong")
       }else if(!doc){
          //alert("User does not exist")
          res.sendFile(__dirname+"/public/usernotexist.html")
       }
       else{
           
        //   req.session.username = doc.username
               let fs= username
   
    res.cookie("loggeduser", fs,{
        maxAge : 1000*60*60*24*31
        // 1 month
        
        
    })
             
    

           res.redirect("/")
       }
       
   })
   
   
  
  
})


app.post("/register", urlencoder, function(req,res){
         let username = req.body.un
         let password = req.body.pw
         let email = req.body.email
        
         
         let user = new User({
        
               username : username,
         password : password,
             email : email
   
         
         
         
         })
         user.save().then((doc)=>{
             
             console.log(doc)
            // req.session.username=doc.username
              let fs= username
   
    res.cookie("loggeduser", fs,{
          maxAge : 1000*60*60*24*31
        // 1 month
        
        
    })
             res.redirect("/")
             
             
             
         }, (err)=>{
            
             res.send("Something went wrong")
             
             
         })
   
         
         })

app.get("/Logout", function(req,res){
    
    console.log(req.cookies.loggeduser)
  res.clearCookie("loggeduser");
    
    res.redirect("/")
})

app.post("/createlist", urlencoder, function(req,res){
    
    
})

app.get("/createlistpage",  function(req,res){
    
       res.sendFile(__dirname+"/public/createlist.html")
    
})

app.post("/deletelist", urlencoder, function(req,res){
})

app.post("/selectist", urlencoder, function(req,res){
})



app.post("/viewlist", urlencoder, function(req,res){
    
    
    
       User.find({
           
        
    }, (err,docs)=>{
        // callback function
        if(err){
            res.send("Something went Wrong")
        }else{
            
            
            //render all lists
         res.render("viewlist.hbs", {
                users:docs
            })
        }
    

        
    })
})
    

app.post("/deletefromlist", urlencoder, function(req,res){
})

    
    app.post("/edititemtime", urlencoder, function(req,res){
})
    
    app.post("/editorder", urlencoder, function(req,res){
        
    })


app.post("/addtolist", urlencoder, (req,res)=>{
     console.log("POST /add")
    
    
    
 //   let item = req.body.item 
  //  let type = req.body.type 
   // let start = req.body.starttime
 ///   let end= req.body.endtime
  //  let idlist= 
    // redirect isntad of res.send admin hbs....
   // let user = new User({
   //     item, type, start, end, idlist
 //   })
    
    
   // user.save().then((doc)=>{
    //   res.redirect("/users")
        
  //  },  (err)=> {
   //     res.send(err)
        
   // })
    
})

app.post("/search", urlencoder, function(req,res){
    
    
    
    
})

app.get("/back", function(req,res){
    
    res.redirect("/")
    
})



app.listen(3000, function(){
    
    console.log("live at port 3000")
})