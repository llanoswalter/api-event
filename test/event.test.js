const { eventInDb, api, server } = require("./test_helper");
const mongoose = require("mongoose");
const Event = require("../models/event/Event");
const shortid = require("shortid");
const slug = require("slug");
const faker = require("faker");

describe("test on event creation", () => {
  beforeEach(async () => {
    await Event.deleteMany({});

    const event = new Event({});
    event.title = faker.name.title();
    event.description = faker.lorem.text();
    event.location = faker.address.direction();
    event.image = faker.image.image();
    event.date = faker.date.future();
    const url = slug(event.title).toLocaleLowerCase();
    event.url = `${url}-${shortid.generate()}`;
    event.user = "610f432043af6b3d80442e71";
    await event.save();
  });

  test("creation succeeds with a fresh event", async () => {
    const eventAtStart = await eventInDb();

    const newUser = {
      username: "root",
      password: "sekret",
    };
    const user = await api.post("/api/login").send(newUser);
    const { token } = JSON.parse(user.text);

    const event = {};
    event.title = faker.name.title();
    event.description = faker.lorem.text();
    event.location = faker.address.direction();
    event.image = faker.image.image();
    event.date = faker.date.future();
    const url = slug(event.title).toLocaleLowerCase();
    event.url = `${url}-${shortid.generate()}`;
    event.user = "610f432043af6b3d80442e71";

    await api
      .post("/api/event")
      .send(event)
      .set(`authorization`, `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const eventAtEnd = await eventInDb();
    expect(eventAtEnd).toHaveLength(eventAtStart.length + 1);
  });

  test("creation of events with error in the request", async () => {
    const eventAtStart = await eventInDb();

    const newUser = {
      username: "root",
      password: "sekret",
    };
    const user = await api.post("/api/login").send(newUser);
    const { token } = JSON.parse(user.text);

    const event = {};
    event.description = faker.lorem.text();
    event.location = faker.address.direction();
    event.image = faker.image.image();
    event.date = faker.date.future();
    event.user = "610f432043af6b3d80442e71";

    await api
      .post("/api/event")
      .send(event)
      .set(`authorization`, `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const eventAtEnd = await eventInDb();
    expect(eventAtEnd).toHaveLength(eventAtStart.length);
  });

  test("creation of events with error in the token", async () => {
    const eventAtStart = await eventInDb();

    const event = {};
    event.description = faker.lorem.text();
    event.location = faker.address.direction();
    event.image = faker.image.image();
    event.date = faker.date.future();
    event.user = "610f432043af6b3d80442e71";

    await api
      .post("/api/event")
      .send(event)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const eventAtEnd = await eventInDb();
    expect(eventAtEnd).toHaveLength(eventAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
