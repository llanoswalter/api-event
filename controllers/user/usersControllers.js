const bcrypt = require("bcrypt");
const User = require("../../models/user/User");
const { validationResult } = require("express-validator");

exports.create_user = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
};

exports.get_users = async (req, res, next) => {
  const users = await User.find({}).populate("Event");
  if (!users || !users.name) return next({ error: "We have no users created" });
  res.json(users);
};
