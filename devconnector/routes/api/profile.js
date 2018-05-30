const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load profile model
const Profile = require('../../models/Profile');

//load profile model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests profile  route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "profile work"})); //this will point to /api/users/test

// @route   GET api/profile
// @desc    get current users profile
// @access  Private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
const errors = {};
  Profile.findOne({ user: req.user.id })
    .then( profile => {
      if(!profile){
        errors.noprofile = "there is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


module.exports = router;
