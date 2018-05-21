const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: "posts work"})); //this will point to /api/users/test

module.exports = router;
