const mongoose = require('mongoose'); //bring in mongoose
const Schema = mongoose.Schema;

//create Schema (the fields that we want)
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// export model so that we can bring into other files
module.exports = Item = mongoose.model('item', ItemSchema);
