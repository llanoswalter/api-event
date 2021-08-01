const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });
let contectionsString = process.env.bd_string;
if (process.env.NODE_ENV === "test") {
  contectionsString = process.env.TEST_MONGODB_URI;
}
mongoose
  .connect(contectionsString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
