const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user/User");
const { validationResult } = require("express-validator");

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(400).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
};
