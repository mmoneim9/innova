const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
app.use(express.static('uploads'))
let ejs = require('ejs')
const mongoose = require('mongoose');
var user;
const userschema  = require('./models/user')
const db = require('./db');
let conn = null;
conn =   db.initDb();
const uri = 'mongodb://mohamed:moha990990990@localhost:21017/innova'
user = conn.model("user",userschema)
const bodyParser = require('body-parser');
const multer  = require('multer')
const bcrypt  = require('bcrypt-nodejs')
const co  = require('./co')
app.use(co)

const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: 'uploads',
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now()
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const upload = multer({
      storage: imageStorage,
      limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
})
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.set('view engine', 'ejs')
app.get("/",function(req,res){
  res.render("index");
})
app.get("/login",function(req,res){
  res.render("login");
})
app.get("/logout",function(req,res){
  res.render("login");
})

app.post("/register",async function(req,res){
var us =await  user.create({name:req.body.name,password:req.body.password,
  cname:req.body.cname,mobile:req.body.mobile,email:req.body.email})
  res.redirect('/login');
})
app.post("/login",async function(req,res){
var us =await  user.findOne({email:req.body.email})
if(us)
  res.redirect('dashboard');
  else
  res.redirect("login")
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
