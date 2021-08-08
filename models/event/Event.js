const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const EventSchema = new Schema(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
EventSchema.plugin(mongoosePaginate);
EventSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Event = model("Event", EventSchema);

module.exports = Event;
