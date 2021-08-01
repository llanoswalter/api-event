const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const eventRoutes = require("./event/eventRoutes");
const userRoutes = require("./event/eventRoutes");
const loginRoutes = require("./login/loginRoutes");

module.exports = function () {
  router.get("/", (req, res) => {
    res.send("Hello Work");
  });
  router.use("/event/", eventRoutes());
  router.use("/user/", userRoutes());
  router.use("/login/", loginRoutes());

  return router;
};
