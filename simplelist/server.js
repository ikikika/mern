const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //take request and get data from body
const path = require('path');

const items = require('./routes/api/items'); // bring in item api route

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

// use routes
app.use('/api/items', items); //anything that goes to /api/items will go to the items const which will refer to the file routes/api/items

//serve static assets if in production
if( process.env.NODE_ENV === 'production' ){
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
