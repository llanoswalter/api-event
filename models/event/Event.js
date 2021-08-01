const { model, Schema } = require("mongoose");

const Event = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: String,
    date: Date,
    url: String,
  },
  { timestamps: true }
);

Event.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Car = model("Event", Event);

module.exports = Event;
