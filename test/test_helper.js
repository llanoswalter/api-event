const User = require("../models/user/User");
const supertest = require("supertest");
const { app, server } = require("../index");
const api = supertest(app);
const Event = require("../models/event/Event");

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};
const eventInDb = async () => {
  const event = await Event.find({});
  return event.map((u) => u.toJSON());
};

module.exports = {
  usersInDb,
  api,
  server,
  eventInDb,
};
