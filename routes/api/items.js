//bring in express router
const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/Item');

//@route GET api/items
// @desc Get all Items
// @access Public
router.get('/', (req, res) => { //the first slash already refer to means the endpoint api/items. if we are in server.js, then we will have to use app.get('api/items')
  Item.find()
    .sort({ date: -1 })
    .then( items => res.json(items) );
});

module.exports = router;
