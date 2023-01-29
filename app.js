const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://bhavya:bhavya-123@cluster0.ayfbdoz.mongodb.net/datab");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const composeSchema={
  title:{
    type:String,
    required:true
  },
  post:{
    type:String,
    required:true
  }
};

const Compose=mongoose.model('Compose',composeSchema);

app.get('/',(req,res)=>{
  Compose.find({},(err,data)=>{
    if(!err){
      if(data.length===0){
        res.render("home",{items:[]});
      }
      else{
        res.render("home",{items:data});
      }
    }
  })
  
})

app.get('/about',(req,res)=>{
  res.render("about")
})
app.get('/contact',(req,res)=>{
  res.render("contact");
}
)
app.get('/compose',(req,res)=>{
  res.render("compose");
}
)
app.post('/compose',(req,res)=>{
  const post_title=req.body.title;
  const post_body=req.body.post;

  const item=new Compose({
    title:post_title,
    post:post_body
  });
    item.save();
  res.redirect('/');
})


app.get('/posts/:id',(req,res)=>{
  var requested_id=req.params.id;
  Compose.findOne({_id:requested_id},(err,data)=>{
    res.render("post",{Blogtitle:data.title,blogpost:data.post})
  });
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
