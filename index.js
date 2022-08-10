const express = require('express')
const app = express()
const port = 4000
app.use(express.static('public'))
app.use(express.static('uploads'))
let ejs = require('ejs')
const mongoose = require('mongoose');
const path = require('path')
module.exports.conn = async function()  {
    return await(mongoose.createConnection('mongodb://admin:moha990990990@127.0.0.1:21017/innova', {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0 // and MongoDB driver buffering
   }));
}
module.exports.conn2 = async function()  {
    return await(mongoose.createConnection('mongodb://admin:moha990990990@127.0.0.1:21017/dbtest', {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0 // and MongoDB driver buffering
   }));
}
const bodyParser = require('body-parser');
const multer  = require('multer')
const bcrypt  = require('bcrypt-nodejs')
const userschema  = require('./models/user')
const suppliermodel  = require('./models/supplier')
var user    = conn.model("user",userschema)
const purchaseo  = require('./models/purchaseo')
const co  = require('./co')
app.use(co)
var po    = conn1.model("purchaseo",purchaseo)
var supplier    = conn1.model("supplier",suppliermodel)

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
module.exports = po,supplier
