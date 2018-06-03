const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load profile validation
const validateProfileInput = require('../../validation/profile');
const validateExpInput = require('../../validation/experience');
const validateEduInput = require('../../validation/education');

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
    .populate('user', ['name', 'avatar'])
    .then( profile => {
      if(!profile){
        errors.noprofile = "there is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    create or edit current users profile
// @access  Private

router.post('/', passport.authenticate('jwt', { session: false }),
(req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if( !isValid ){
      // return any errors with 400 Status
      return res.status(400).json(errors);
    }

    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if( req.body.handle ) profileFields.handle = req.body.handle;
    if( req.body.company ) profileFields.company = req.body.company;
    if( req.body.website ) profileFields.website = req.body.website;
    if( req.body.location ) profileFields.location = req.body.location;
    if( req.body.bio ) profileFields.bio = req.body.bio;
    if( req.body.status ) profileFields.status = req.body.status;
    if( req.body.githubusername ) profileFields.githubusername = req.body.githubusername;
    // skills, split csv into array
    if( typeof req.body.skills !== 'undefined' ) {
      profileFields.skills = req.body.skills.split(',');
    };
    // social
    profileFields.social = {};
    if( req.body.youtube ) profileFields.social.youtube = req.body.youtube;
    if( req.body.twitter ) profileFields.social.twitter = req.body.twitter;
    if( req.body.linkedin ) profileFields.social.linkedin = req.body.linkedin;
    if( req.body.facebook ) profileFields.social.facebook = req.body.facebook;
    if( req.body.instagram ) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id})
      .then( profile => {
          if(profile){
            //this is an update
            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            )
            .then( profile => res.json(profile) )
          } else {
            // create
            //check if handle exist
            Profile.findOne({handle: profileFields.handle})
              .then(profile => {
                if(profile){
                  errors.handle = "that handle already exist";
                  res.status(400).json(errors);
                }
              //save profile
              new Profile(profileFields).save().then(profile => res.json(profile));
            });
          }
      });
});

// @route   POST api/profile/experience
// @desc    add experience to profile
// @access  Private

router.post('/experience', passport.authenticate('jwt', {session:false}), (req, res) => {

  const { errors, isValid } = validateExpInput(req.body);

  // check validation
  if( !isValid ){
    // return any errors with 400 Status
    return res.status(400).json(errors);
  }

  Profile.findOne( {user: req.user.id} )
    .then( profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // //add to experience array
      profile.experience.unshift( newExp );
      profile.save().then( profile=> res.json(profile) );


    });
});

// @route   POST api/profile/education
// @desc    add education to profile
// @access  Private

router.post('/education', passport.authenticate('jwt', {session:false}), (req, res) => {

  const { errors, isValid } = validateEduInput(req.body);

  // check validation
  if( !isValid ){
    // return any errors with 400 Status
    return res.status(400).json(errors);
  }

  Profile.findOne( {user: req.user.id} )
    .then( profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // //add to experience array
      profile.education.unshift( newEdu );
      profile.save().then( profile=> res.json(profile) );


    });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete experience
// @access  Private

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', {session:false}),
  (req, res) => {

  Profile.findOne( {user: req.user.id} )
    .then( profile => {
      // get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        if( removeIndex >= 0 ){
          // splice out of array
         profile.experience.splice(removeIndex, 1);
          // //save
          profile.save().then( profile => res.json(profile) );
        }

    })
    .catch(err => res.status(404).json(err));

});

module.exports = router;
