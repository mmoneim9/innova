const express = require('express')
const app = express()
const port = 4000
app.use(express.static('public'))
app.use(express.static('uploads'))
let ejs = require('ejs')
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser');
const multer  = require('multer')
const bcrypt  = require('bcrypt-nodejs')
module.exports.conn2 = async function()  {
    return await(mongoose.createConnection('mongodb://admin:moha990990990@127.0.0.1:21017/dbtest', {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0 // and MongoDB driver buffering
   }).then(()=>{

     var po    = conn1.model("purchaseo",purchaseo)
     var supplier    = conn1.model("supplier",suppliermodel)


   }));
}
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
app.post("/addsupplier",async function(req,res){
  var us =await supplier.create({name:req.body.sname,description:req.body.desc,mobile:req.body.mobile,
    email:req.body.email,category:req.body.cat})
    res.redirect('/supplier');

})
app.post("/searchsupplier",async function(req,res){
  var sup = await supplier.find();

  var sup2 =await supplier.find({name:{ $regex: '.*' + req.body.suppliername + '.*' } })
    res.render("supplier",{sup:sup,sup2:sup2});

})
app.post("/updatesupplier",async function(req,res){
  var us =await supplier.findOneAndUpdate({_id:req.body.snameu},{name:req.body.sname,description:req.body.desc,mobile:req.body.mobile,
    email:req.body.email,category:req.body.cat})
    res.redirect('/supplier');
})

app.get("/deletesupplier",async function(req,res){
  var us =await supplier.deleteOne({_id:req.query.id})
    res.redirect('/supplier');
})


app.get("/dashboard",function(req,res){
  res.render("dashboard");
})
app.get("/supplier",async function(req,res){
  var sup = await supplier.find();
  res.render("supplier",{sup:sup});
})
app.get("/po",async function(req,res){
  var sup = await supplier.find();
  res.render("po",{sup:sup});
})
app.post("/addpo",async function(req,res){
  var sup = await supplier.findOne({_id:req.body.snameu});
  var us =await  po.create({date:Date(),supplier:sup.email,id:sup.id,material:req.body.material,price:req.body.price})
    res.redirect('/po');
})
module.exports = app
