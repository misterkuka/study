const express = require('express');
const router = express.Router();
const Name = require('../models/name');
const Moniker = require('moniker');
const bodyParser = require('body-parser');

// get random names
router.get("/random", function(req, res) {
  Name.find({}, function(err, names) {
    if (err) {
      res.redirect('/');
    } else {
      res.render("generated", {
        name: names,
        random: Moniker.choose()
      });
    }
  });

});

// add
router.post("/random", function(req, res, next) {
  const random = req.body.random;
  Name.create({
    name: random
  }).then(function(name) {
    res.redirect('/api/random');
  }).catch(next);
});

// edit
router.post("/random/edit/:id", function(req, res, next) {
  Name.findByIdAndUpdate({
    _id: req.params.id
  }, {
    name: req.body.random
  }).then(function() {
    res.redirect('/api/random')
  }).catch(next);
});

// delete
router.post("/random/delete/:id", function(req, res, next) {
  Name.findByIdAndRemove({
    _id: req.params.id
  }, req.body.random).then(function() {
    res.redirect('/api/random')
  }).catch(next);
});

module.exports = router;
