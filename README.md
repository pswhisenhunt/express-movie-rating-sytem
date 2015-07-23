# Node.js with Express Movie Rating System v 1.0

This is an application I built to help me learn Express, user auth, sessions, and MongoDB. Instead of using 'express-generator', I wrote everything manually and commented as I went to make sure I had a good understanding of what the code meant.

I used Grunt, Sass, Node.js, EJS for templates, express-session for sessions, bcrypt for user authentication, Express, MongoDB, and Monk.

Home Page:
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/home.png)

Trying to login without creating an account:
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/incorrect_login.png)

Registering an account:
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/register.png)

New user account:
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/new_user_acct.png)

Clicking 'browse movies' will display a list of all movies in the database. The logged in user can easily add movies to their collection this way.
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/browse_movies.png)

Here the user is adding 'Up' to their collection from browse.
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/add_movies_from_browse.png)

Then, the user is redirected back to their page and 'Up' has been added to their collection
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/redirects_to_user_acct.png)

The user can edit information and change the rating for a movie in their collection:
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/edit.png)

The user can add a movie to their collection, which will add the movie to the database, and automatically add it to their collection as well:
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/add_you_collection.png)

The user can add a movie to the database without adding it to their collection:
![express movie app](https://github.com/pswhisenhunt/express-movie-rating-sytem/blob/master/app-imgs/add_to_db.png)

The user can also logout, delete their account, and delete movies from their collection. Deleting a movies from their collection will not delete it from the database.
