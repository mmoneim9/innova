const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name:String,
  cname:String,
  email:String,
  mobile:String,
  password:String,
}) ;
module.exports = userschema
