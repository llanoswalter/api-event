const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

module.exports = function () {
  router.get("/", (req, res) => {
    res.send("Hello Events");
  });

  return router;
};
