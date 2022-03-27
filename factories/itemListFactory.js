require("mongoose");
var listsModel = require("../schemas/listsSchema");

function getList(name) {
  return new Promise(function (resolve, reject) {
    var query = listsModel.find({ name });
    query.exec(function (err, listArr) {
      if (err) {
        return reject({ err: "Error while fetching list" });
      } else if (!listArr.length) {
        return reject({ err: "No List Found" });
      }
      console.log("List Found");
      // If no errors are found, it responds with a JSON of all users
      return resolve(listArr);
    });
  });
}

function updateList(updatedObj) {
  return new Promise(function (resolve, reject) {
    var query = listsModel.findOneAndUpdate(
      { name: updatedObj.name },
      { list: updatedObj.list },
      { new: true }
    );

    query.exec(function (err) {
      if (err) {
        return reject(err);
      }
      console.log("Successfully updated in DB.");
      // If no errors are found, it responds with a JSON of the new items
      return resolve(updatedObj);
    });
  });
}

function postNewList(newListObj) {
  return new Promise(function (resolve, reject) {
    // Creates a new User based on the Mongoose schema and the post body
    var newList = new listsModel(newListObj);
    // New List is saved in the db.
    newList.save(function (err) {
      if (err && err.code === 11000) {
        return reject({ ...err, message: "List already exists!" });
      } else if (err) {
        return reject(err);
      }
      console.log("Successfully saved to DB.");
      // If no errors are found, it responds with a JSON of the new items
      return resolve(newListObj);
    });
  });
}

module.exports = { postNewList, getList, updateList };
