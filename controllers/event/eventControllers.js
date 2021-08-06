const { validationResult } = require("express-validator");
const Event = require("../../models/event/Event");
const User = require("../../models/user/User");
const multer = require("multer");
const shortid = require("shortid");
const slug = require("slug");
const faker = require("faker");

exports.save_image = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        return next({ error: error.message });
      } else {
        return end({ error: error.message });
      }
    } else {
      next();
    }
    return;
  });
};
const configurationMulter = {
  limits: { fileSize: 100000 },
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

exports.get_events = async (req, res, next) => {
  const limit = parseInt(req.params.limit, 10) || 10;
  const page = parseInt(req.params.page, 10) || 1;
  console.log(page);
  const event = await Event.paginate({}, { limit, page, sort: { date: -1 } });
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
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, location, date, userid } = req.body;
  const user = await User.findById(userid);
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

exports.generate_Event = async (req, res, next) => {
  for (let I = 0; I <= 30; I++) {
    const event = new Event({});
    event.title = faker.name.title();
    event.description = faker.lorem.text();
    event.location = faker.address.direction();
    event.image = faker.image.image();
    event.date = faker.date.future();
    const url = slug(event.title).toLocaleLowerCase();
    event.url = `${url}-${shortid.generate()}`;
    event.user = "6109df3451ccc547b8c9df0e";
    await event.save();
    if (I == 30) res.json({ message: "guardados" });
  }
};
