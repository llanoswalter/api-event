const { validationResult } = require("express-validator");
const Event = require("../../models/event/Event");
const User = require("../../models/user/User");
const multer = require("multer");
const shortid = require("shortid");
const slug = require("slug");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

exports.save_image = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        return next({ error: error.message });
      } else {
        return next({ error: error.message });
      }
    } else {
      next();
    }
    return;
  });
};
const configurationMulter = {
  limits: { fileSize: 10000000 },
  storage: (fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: (req, file, cd) => {
      const extension = file.mimetype.split("/")[1];
      cd(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cd) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/svg+xml" ||
      file.mimetype == "image/png"
    ) {
      cd(null, true);
    } else {
      cd(new Error("format no valid"), false);
    }
  },
};
const upload = multer(configurationMulter).single("image");

exports.get_events_paginate = async (req, res, next) => {
  const limit = parseInt(req.params.limit, 10) || 10;
  const page = parseInt(req.params.page, 10) || 1;
  const current_date = new Date();
  const event = await Event.paginate(
    { date: { $gt: current_date } },
    { limit, page, sort: { date: -1 } }
  );
  if (!event && !event.name) return next({ error: "We have no event created" });
  res.json(event);
};

exports.get_events = async (req, res, next) => {
  const current_date = new Date();
  const event = await Event.find({ date: { $gt: current_date } }).limit(10);
  if (!event && !event.name) return next({ error: "We have no event created" });
  res.json(event);
};

exports.get_events_featured = async (req, res, next) => {
  const current_date = new Date();
  const event = await Event.find({ date: { $gt: current_date } })
    .limit(10)
    .sort({ date: -1 });
  if (!event && !event.name) return next({ error: "We have no event created" });
  res.json(event);
};

exports.get_event_url = async (req, res, next) => {
  const event = await Event.find({ url: req.params.id }).populate("User", { username: 1, name: 1 });
  if (!event && !event.name) return next({ error: "We have no event created" });
  res.json(event);
};

exports.create_event = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ errors: errors.array() });
  }
  const { userId } = req;

  const user = await User.findById(userId);

  const { title, description, location, date } = req.body;
  const newEvent = new Event({
    title,
    description,
    location,
    date,
    user: user._id,
  });
  if (req.file) newEvent.image = req.file.filename;
  const url = slug(newEvent.title).toLocaleLowerCase();
  newEvent.url = `${url}-${shortid.generate()}`;
  const saveEvent = await newEvent.save();
  user.event = user.event.concat(saveEvent._id);
  await user.save();

  res.json(saveEvent);
};

exports.share_an_event = async (req, res, next) => {
  const event = await Event.find({ url: req.params.id }).populate("User", { username: 1, name: 1 });
  if (!event && !event.name) return next({ error: "We have no event created" });
  const share = `Iré al evento "${
    event[0].title
  }", que se llevara a cavo el "${event[0].date.toLocaleString()}" LINK "http://localhost:3001/api/event/${
    event[0].url
  }"`;
  res.json(share);
};

exports.image_event = async (req, res, next) => {
  const fileName = req.params.fileName;
  const pathFIle = path.join(__dirname, "../../public/images/") + fileName;
  if (fs.existsSync(pathFIle)) {
    console.log("si");
    res.sendFile(path.resolve(pathFIle));
  } else {
    console.log("no");
    res.status(401).json({ error: "image no exist" });
  }
};
