const mongoose = require("mongoose");
const purshaseo = new mongoose.Schema({
  date:Date,
  supplier:String,
  id:String,
  material:String,
  price:String,
}) ;
module.exports = purshaseo
