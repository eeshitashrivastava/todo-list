var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var listsSchema = new Schema({
  name: {type: String, required: true, unique: true},
  list: [String],
});

module.exports = mongoose.model("list", listsSchema);
