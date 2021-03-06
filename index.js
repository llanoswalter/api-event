require("dotenv").config({ path: "variables.env" });
require("./config/bd");

const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const app = express();
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router());
app.use(notFound);
app.use(handleErrors);
const PORT = process.env.PORT || 55635;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
