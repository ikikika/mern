require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const handle = require("./handlers");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("hello 123");
});

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`Server started on port ${port}`));
