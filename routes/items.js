var express = require("express");
var router = express.Router();
var {
  getList,
  postNewList,
  updateList
} = require("../factories/itemListFactory");

router.get("/", function (req, res, next) {
  let name = req.query.name;
  getList(name).then(
    function (response) {
      res.json({
        message: "get successful",
        name: response[0].name,
        list: response[0].list,
      });
    },
    function (error) {
      res.json({ message: "get unsuccessful", error: error });
    }
  );
});

router.post("/", function (req, res, next) {
  var newListObj = req.body;

  postNewList(newListObj).then(
    function (response) {
      res.json({
        message: "Creation of List successful.",
        response: response,
      });
    },
    function (error) {
      res.status(400).json({
        message: "Creation of List unsuccessful.",
        error: error,
      });
    }
  );
});

router.put("/", function (req, res) {
  var updatedObj = req.body;

  updateList(updatedObj).then(
    function (response) {
      res.json({
        message: "Updation of List successful.",
        response: response,
      });
    },
    function (error) {
      res.json({
        message: "Updation of List unsuccessful.",
        error: error,
      });
    }
  );
});
router.delete("/", function (req, res) {});

module.exports = router;
