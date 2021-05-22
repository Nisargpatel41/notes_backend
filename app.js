const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const notes = require("./routes/notes");
// const MONGODB_URI = process.env.MONGO_DB_STRING;

const MONGODB_URI = config.get("dbstring");

const app = express();
app.use(express.json());
app.use(cors());

if (!config.get("dbstring")) {
  console.log("db string not defined");
}

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", notes);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
