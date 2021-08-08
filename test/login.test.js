const { usersInDb, api, server } = require("./test_helper");
const mongoose = require("mongoose");
const User = require("../models/user/User");
const bcrypt = require("bcrypt");
const { response } = require("express");

describe("test user input to the application", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("test the login with the correct user data", async () => {
    const newUser = {
      username: "root",
      password: "sekret",
    };
    await api
      .post("/api/login")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("request to login with incorrect password", async () => {
    const newUser = {
      username: "root",
      password: "sekret1",
    };
    await api
      .post("/api/login")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("request to login with incorrect user", async () => {
    const newUser = {
      username: "rooot",
      password: "sekret",
    };
    await api
      .post("/api/login")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});
afterAll(() => {
  mongoose.connection.close();
  server.close();
});
