var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/movie-rating-system');
var users = db.get('users');
var bcrypt = require('bcrypt');
var session = require('express-session');
var sess;

// Default routes (root or '/'), which contains login and register forms;
// ----------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/login', function(req,res, next) {
  res.render('login', {});
});

router.post('/login', function(req, res, next) {
  users.findOne({email: req.body.email}, function(err, doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      sess = req.session;
      sess.email = req.body.email;
      sess.user = doc;
      res.redirect('/users/'+ doc._id)
    } else {
      res.render('error', {});
    }
  })
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  var user = {};
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  users.insert(user, function(err, doc) {
    if(err) {
      throw err
    }
    res.redirect('/');
  });
});

router.get('/logout', function(req, res, next) {
  sess.destroy(function(err){
    if(err){
      console.log(err);
    }
    else {
      res.redirect('/');
    }
  });
});


// user routes:
// ----------------------------------------------------------------------
router.get('/users/:id', function(req, res, next) {
  if(sess.email) {
    res.render('show', sess.user);
  } else {
    res.redirect('/');
  }
});

//adds a new movie to the user's movies
router.post('/users/:id/movies', function(req, res, next) {

});

//gets the form to add a new movie to the user's collection
router.get('/users/:id/movies/new', function(req, res, next) {

});

//removes a movie from the user's collection
router.delete('/users/:id/movies/:id', function(req, res, next) {

});

//updates a movie from the user's collection
router.put('/users/:id/movies/:id', function(req, res, next) {

});

//delete's the user's account
router.delete('/users/:id', function(req, res, next) {

});

//edit's a user's info (name, email)
router.put('/users/:id', function(req, res, next) {

});

module.exports = router;
