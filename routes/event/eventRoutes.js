const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const eventControllers = require("../../controllers/event/eventControllers");
const userExtractor = require("../../middleware/userExtractor");

module.exports = function () {
  router.get("/", eventControllers.get_events);
  router.get("/featured", eventControllers.get_events_featured);
  router.get("/image/:fileName", eventControllers.image_event);
  router.get("/paginate/:page?/:limit?", userExtractor, eventControllers.get_events_paginate);
  router.get("/share/:id", eventControllers.share_an_event);
  router.get("/:id", eventControllers.get_event_url);
  router.post(
    "/",
    userExtractor,
    eventControllers.save_image,
    body("title").not().isEmpty().trim().escape(),
    body("description").not().isEmpty().trim().escape(),
    body("location").not().isEmpty().trim().escape(),
    body("date").not().isEmpty().isISO8601().toDate(),
    eventControllers.create_event
  );
  return router;
};
