const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userControllers = require("../../controllers/user/usersControllers");

module.exports = function () {
  router.get("/", userControllers.get_users);
  router.post(
    "/",
    body("username").not().isEmpty().trim().escape(),
    body("name").not().isEmpty().trim().escape(),
    body("password").not().isEmpty().trim().escape().isLength({ min: 8 }),
    userControllers.create_user
  );
  return router;
};
