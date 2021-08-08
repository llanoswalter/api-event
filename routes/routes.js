const express = require("express");
const router = express.Router();
const eventRoutes = require("./event/eventRoutes");
const userRoutes = require("./user/userRoutes");
const loginRoutes = require("./login/loginRoutes");

module.exports = function () {
  router.get("/", (req, res) => {
    res.send("Hello Work");
  });
  router.use("/api/users/", userRoutes());

  return router;
};
