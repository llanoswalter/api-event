const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  name: String,
  passwordHash: String,
  event: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);

module.exports = User;
