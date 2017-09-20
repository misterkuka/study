const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// kuka Schema and model
const NameSchema = new Schema({
  name:{
    type:String
  }
});

const Name = mongoose.model("name", NameSchema);

module.exports = Name;
