const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const eventControllers = require("../../controllers/event/eventControllers");

module.exports = function () {
  // router.get("/guardarRandon", eventControllers.generate_Event);
  router.get("/paginate/:page?/:limit?", eventControllers.get_events);
  router.get("/share/:id", eventControllers.share_an_event);
  router.get("/:id", eventControllers.get_event_url);
  router.post(
    "/",
    eventControllers.save_image,
    body("title").not().isEmpty().trim().escape(),
    body("description").not().isEmpty().trim().escape(),
    body("location").not().isEmpty().trim().escape(),
    body("date").not().isEmpty().isISO8601().toDate(),
    body("userid").not().isEmpty().trim().escape(),
    eventControllers.create_event
  );
  return router;
};
