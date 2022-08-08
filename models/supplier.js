const mongoose = require("mongoose");
const suppliermodel = new mongoose.Schema({
  name:String,
  email:String,
  mobile:String,
  description:String,
  category:String,
}) ;
module.exports = suppliermodel;
