const express = require("express")
const bodyparser = require("body-parser")
const session= require("express-session")
// aded fpor cookie parser
const cookieparser= require("cookie-parser")
const app = express()
const mongoose = require("mongoose")
const {User} = require("./model/user.js")
const {List} = require("./model/list.js")
const {Item} = require("./model/item.js")
const hbs= require("hbs")

 ObjectID = require('mongodb').ObjectID; 



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

  let itemlist;
    let listname;
    console.log(req.cookies.curList)
   // console.log(req.cookies.loggeduser)
    if(req.cookies.loggeduser){
        if(!req.cookies.curList){
        
        console.log(req.cookies.UserId)
    
      res.render("home.hbs",{
        username: req.cookies.loggeduser
          
      })
        }
        
        
        
        else{
            console.log("whyareyouhere")
        List.findOne({
           _id: req.cookies.curList
    }, (err,doc)=>{
        
        if(err){
            res.send("Something went Wrong")
        }else{
            
    listname= doc.name
             itemlist= doc.item
          
            console.log(doc.name)
            console.log(listname)
        }
           
       
if(itemlist==null){
    console.log("listname"+ listname)
       res.render("home.hbs",{
        username: req.cookies.loggeduser,
        list: listname
              })
}else{
  
  List.find({  _id : { $in : itemlist}
    }, (err,docs)=>{
        
   if(err){
            res.send("Something went Wrong")
        }else{
            
     res.render("home.hbs",{
        username: req.cookies.loggeduser,
        list: listname,
         items: docs
              })
            console.log(docs);
        }
        
    })  
}
            
            
           
        })
                    
  }
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
               let fs2 = doc._id
    res.cookie("loggeduser", fs,{
        maxAge : 1000*60*60*24*31
        // 1 month
        
        
    })
           res.cookie("UserId", fs2, {
                maxAge : 1000*60*60*24*31
               
               
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
              let fs2 = doc._id
               
    res.cookie("loggeduser", fs,{
          maxAge : 1000*60*60*24*31
        // 1 month
        
        
    })
             res.cookie("UserId", fs2, {
                maxAge : 1000*60*60*24*31
               
               
           })   
  
             res.redirect("/")
             
             
             
         }, (err)=>{
            
             res.send("Something went wrong")
             
             
         })
   
         
         })

app.get("/Logout", function(req,res){
    
    console.log(req.cookies.loggeduser)
  res.clearCookie("loggeduser");
      res.clearCookie("UserId");
     res.clearCookie("curList");
    res.redirect("/")
})

app.post("/createlist", urlencoder, function(req,res){

     let  listname= req.body.listname
    let date = req.body.date
   
      let list = new List({
        
               name : listname,
               date : date 
         
         
         
         })
         list.save().then((doc)=>{
             
             console.log(doc)
            // req.session.username=doc.username
             
  
             
             
             
             
         }, (err)=>{
            
             res.send("Something went wrong")
             
             
         })
    User.update  ({
       _id : req.cookies.UserId
    },{
         $push: { list:list  } 
        
    },(err, doc)=>{
        
        
       
        
        if(err){
            res.send("something went wrong")
        }else{
          
                res.redirect("/")
        }
        
        
    })

    
})

app.get("/createlistpage",  function(req,res){
    
       res.sendFile(__dirname+"/public/createlist.html")
    
})

app.post("/deletelist", urlencoder, function(req,res){
    
   
    List.deleteOne({
        _id: req.body.id
        
    }, (err,doc)=>{
        if(err){
            res.send(err)
        }else{
           
        }
        
    })
    
    User.update({
        _id:req.body.id},{
                $pull: { list: req.body.id  } 
            },(err, doc)=>{
        
        
       
        
        if(err){
            res.send("something went wrong")
        }else{
          
                res.send(doc)
        }
        
        
    })
    
})

app.post("/selectlist", urlencoder, function(req,res){
    fs3= req.body.id;
   // console.log(fs3+"thisoneoverhere")
    res.cookie("curList", fs3,{
        maxAge : 1000*60*60*24*31
        // 1 month
        
        
    })
    console.log(req.cookies.curList)
    res.redirect("/")
   
    
})



app.get("/viewlist", function(req,res){
   let listids;
    console.log(req.cookies.UserId)
     User.findOne({
           _id: req.cookies.UserId
    }, (err,doc)=>{
        // callback function
        if(err){
            res.send("Something went Wrong")
        }else{
            
            
            
            console.log(doc.list)
             listids= doc.list
            console.log("why wont it work" +listids)
        }
           
       
console.log("thisone"+listids.map(ObjectID))
  
  List.find({  _id : { $in : listids }
    }, (err,docs)=>{
        
   if(err){
            res.send("Something went Wrong")
        }else{
            
        res.render("viewlist.hbs",{
        list:docs
      })
            console.log(docs);
        }
        
    }) 
    

  /*   List.find({  _id : { $in: User.find(req.cookies.UserId).map(function (doc) {
      return doc._id
    })
                        }
    }, (err,docs)=>{
        
   if(err){
            res.send(err)
        }else{
            
       // res.render("viewlist.hbs",{
      //  list:docs
     // })
            console.log(docs);
        }*/
        
    }) 
})
    

app.post("/deletefromlist", urlencoder, function(req,res){
})
app.post("/edit", urlencoder, function(req,res){
    console.log(req.body.id)
    List.findOne({
        _id: req.body.id 
              }, (err,doc)=>{
        
   if(err){
            res.send("Something went Wrong")
        }else{
            
        res.render("edit.hbs",{
        list:doc.name,
        id: doc._id
      })
            console.log(doc);
        }
        
    }) 
    
})
app.post("/editlist", urlencoder, function(req,res){
    let  listname= req.body.listname
    let date = req.body.date
   let id= req.body.id
   console.log(listname + date+id)
       List.updateOne({
           _id:id
       },{  
               name : listname,
               date : date 
       },(err, doc)=>{
        
        
       
        
        if(err){
            res.send(err)
        }else{
          console.log(doc)
                res.redirect("/viewlist")
        }
         
         
         })
    
    
    
    
    
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