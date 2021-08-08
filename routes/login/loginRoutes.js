const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const loginControllers = require("../../controllers/login/loginControllers");

module.exports = function () {
  router.post(
    "/",
    body("username").not().isEmpty().trim().escape(),
    body("password").not().isEmpty().trim().escape(),
    loginControllers.login
  );

  return router;
};
