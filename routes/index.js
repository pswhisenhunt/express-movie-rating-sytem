var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/movie-rating-system');
var users = db.get('users');
var movies = db.get('movies');
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
    if (err) {
      res.render('login-error', {});
    }
    if(!doc) {
      res.render('login-error', {});
    } else {
      if (bcrypt.compareSync(req.body.password, doc.password)) {
        sess = req.session;
        sess.email = req.body.email;
        sess.user = doc;
        res.redirect('/users/'+ doc._id)
      } else {
        res.render('login-error', {});
      }
    }
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  var user = {};
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  user.movies = [];
  users.insert(user, function(err, doc) {
    if(err) {
      console.log(err);
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
  var id = req.url.split('/')
  id = id[2];
  if(sess.user) {
    users.findOne({_id: id}, function(err, doc) {
      res.render('show', doc);
    });
  } else {
    res.redirect('/');
  }
});

//adds a new movie to the user's movies
router.post('/users/:id/movies', function(req, res, next) {
  var movie = {};
  movie.title = req.body.title,
  movie.director = req.body.director,
  movie.year = req.body.year,
  movie.rating = req.body.rating,
  movie.posterUrl = req.body.posterUrl
  movies.insert(movie, function(err, newMovie) {
    if (err) {
      console.log(err);
    } else {
      users.findAndModify({_id: sess.user._id }, {$push: { movies: newMovie }}, function(err, doc) {
        res.redirect('/users/' + doc._id);
      });
    }
  });
});

router.post('/users/:id/movies/:id/add', function(req, res, next) {
  var splitUrl = req.url.split('/');
  var movieId= splitUrl[4];
  var userId = splitUrl[2];
  movies.findOne({_id: movieId}, function(err, movie) {
    if (err) {
      console.log(err)
      throw err;
    } else {
      users.findAndModify({_id: userId }, {$push: { movies: movie }}, function(err, doc) {
        res.redirect('/users/' + doc._id);
      });
    }
  })
});
//gets the form to add a new movie to the user's collection
router.get('/users/:id/movies', function(req, res, next) {
  if (sess.user) {
    res.render('new', sess.user);
  } else {
    res.render('login', {});
  }
});

//removes a movie from the user's collection
router.post('/users/:id/movies/:id/delete', function(req, res, next) {
  var splitUrl = req.url.split('/');
  var movieId= splitUrl[4];
  var userId = splitUrl[2];
  movies.findOne({_id: movieId}, function(err, movie) {
    if (err) {
      throw err;
    } else {
      users.findAndModify({query: {'_id': userId}, update: { $pull : {'movies': {'_id': movie._id}}}}, function(err, doc) {
          res.redirect('/users/'+ doc._id);
      });
    }
  });
});

router.get('/users/:id/movies/:id/edit', function(req, res, next) {
  var splitUrl = req.url.split('/');
  var movieId= splitUrl[4];
  var userId = splitUrl[2];
  var userAndMovieToEdit = {};
  users.findOne({_id: userId}, function(err, user) {
    if (err) {
      throw err;
    } else {
      userAndMovieToEdit["user"] = user;
      movies.findOne({_id: movieId}, function(err, movie) {
        if (err) {
          throw err;
        } else {
          userAndMovieToEdit["movie"] = movie;
        }
        res.render('edit', userAndMovieToEdit);
      });
    }
  });
});

//updates a movie from the user's collection
router.post('/users/:id/movies/:id/update', function(req, res, next) {
  var splitUrl = req.url.split('/');
  var movieId= splitUrl[4];
  var userId = splitUrl[2];
  var newMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    rating: req.body.rating,
    posterUrl: req.body.posterUrl
  }
  movies.findOne({_id: movieId}, function(err, movie) {
    if (err) {
      throw err
    }
    users.update({_id: userId}, {$pull: {movies: movie}});
  })
  .success(function() {
    movies.findAndModify({
      "query": { "_id": movieId },
      "update": {
        "$set": newMovie
      }
    },
    function(err, movie) {
      console.log(movie)
      newMovie._id = movie._id
      if (err) {
        throw err;
      } else {
        users.findAndModify({_id: userId }, {$push: { movies: newMovie }}, function(err, doc) {
          res.redirect('/users/' + doc._id);
        });
      }
    });
  });
});

//delete's the user's account
router.post('/users/:id', function(req, res, next) {
  var id = req.url.split('/')
  id = id[2];
  users.remove({_id: id}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    sess.destroy(function(err) {
      if(err){
        console.log(err);
      }
      else {
        res.redirect('/');
      }
    });
  });
});


// movie routes:
// ----------------------------------------------------------------------

router.get('/movies', function(req, res, next) {
  var currentUserAndAllMovies = {}
  users.findOne({_id: sess.user._id}, function(err, doc) {
    if (err) {
      throw err;
    } else {
      console.log(doc)
      currentUserAndAllMovies["user"] = doc;
    }
  });
  movies.find({}, function(err, docs) {
    if (err) {
      throw err;
    } else {
      console.log(docs)
      currentUserAndAllMovies["movies"] = docs;
      console.log(currentUserAndAllMovies);
      res.render('movies/index', currentUserAndAllMovies);
    }
  })
});

router.get('/movies/new', function(req, res, next) {
  res.render('movies/new', {});
});

router.post('/movies', function(req, res, next) {
  var movie = {};
  movie.title = req.body.title,
  movie.director = req.body.director,
  movie.year = req.body.year,
  movie.rating = req.body.rating,
  movie.posterUrl = req.body.posterUrl;
  movies.insert(movie, function(err, newMovie) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/movies');
    }
  });
});



module.exports = router;
