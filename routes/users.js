var express = require('express');
var router = express.Router();
require('mongoose');
var usersSchema = require('../schemas/usersSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function getUsers() {
  return new Promise( function (resolve, reject) {
    var query = usersSchema.find({});
    query.exec(function(err, users) {
        if (err){
            return reject({err : 'Error while fetching users'});
        }
        // If no errors are found, it responds with a JSON of all users
        return resolve(users);
     });
  });
}



function postUser(req) {
    return new Promise( function (resolve, reject) {
    // Creates a new User based on the Mongoose schema and the post body
      var newUser = new usersSchema(req.body);
      // New User is saved in the db.
      newUser.save(function(err) {
          console.log('err',err);
          if (err){
              return reject({err : 'Error while saving new user'});
          }
          // If no errors are found, it responds with a JSON of the new users
          return resolve(req.body);
      });
    });
}

module.exports = router;
