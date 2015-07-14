var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/movie-rating-system');
var users = db.get('users');
var bcrypt = require('bcrypt');

//the routes for a user once they are logged in

//get the user's page, which lists their movies
router.get('/users/:id', function(req, res, next) {
  
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
