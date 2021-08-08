const express = require("express");
const router = express.Router();

module.exports = function () {
  router.get("/", (req, res) => {
    res.send("Hello Work");
  });

  return router;
};
