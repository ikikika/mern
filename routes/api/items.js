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

//@route post api/items
// @desc create an item
// @access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save()
    .then( item => res.json(item) );
});

//@route DELETE api/items/:id
// @desc delete an item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then( item =>item.remove().then( () => res.json({success: true})) )
    .catch( err => res.status(404).json({ success: false}) );
});

module.exports = router;
