const mongoose = require("mongoose");

//get access to Schema constructor
const Schema = mongoose.Schema;

//create a new schema for our app using the Schema constructor
const schema = new Schema({
  name: {type: String, required:true},
  type: {type: String, required:true},
  assignee: {type: String, required:true},
  description: {type: String, required:false},
  status: {type: Boolean, required: false}
});

// export the model with associated name and schema
module.exports = mongoose.model("List", schema);