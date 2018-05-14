const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //take request and get data from body

//initialise express
const app = express();

// middleware for body parser
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose.connect(db)
  .then(
    () => console.log('Mongodb connected!')
  )
  .catch(
    err => console.log(err)
  );

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
