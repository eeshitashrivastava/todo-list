var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({
          name: {type: String, required : true}
});

module.exports = mongoose.model('usersSchema', usersSchema);