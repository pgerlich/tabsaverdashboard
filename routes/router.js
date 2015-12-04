var express = require('express');
var router = express.Router();
var Parse = require('parse/node').Parse;

/* Intiailize parse for dynamic UI rendering */
Parse.initialize("mZ1wJCdlDowI28IzRpZ9ycIFkm0TXUYA33EoC3n8", "fOD175berXCPHD9VkQTml4k1EsyX84L6XX2uvZMP");

//Enable this to allow direct session manipulation (necessary for Node.js)
Parse.User.enableUnsafeCurrentUser();

/* GET home page based on login status. */
router.get('/', function(req, res, next) {

  //Try and assume users identity
  Parse.User.become(req.session.token ? req.session.token : "NoTokenFound").then(function (user) {
      //On success, direct them to the home page
      res.render('pages/index', { title: 'Tabsaver Dashboard - Home' });
    }, function (error) {
      //On failure, log it briefly and direct them to the login page
      console.log(error);
      res.render('pages/login', { title: 'Tabsaver Dashboard - Login' });
    });
});

/* Other pages */

/* Login handling */
router.post('/login', function(request, response){
    var username = request.body.username;
    var password = request.body.password;

    Parse.User.logIn(username, password, {
        success: function(user) {
            request.session.token = user.getSessionToken();
            console.log(user.getSessionToken());
            response.sendStatus('OK');
            console.log("success")
        },
        // If there is an error
        error: function(user, error) {
          console.log("failure")
           response.send(error);
        }
    });  
});

/* Logout handling */
router.post('/logout', function(request, response){
    //TODOOO
});

/* Registration handling */
router.post('/register', function(request, response){
    var username = request.body.username;
    var password = request.body.password;

    var user = new Parse.User();
    user.set("username", username);
    user.set("email", username);
    user.set("password", password);

    user.signUp(null, {
      success: function(user) {
        req.session.token = user._sessionToken;
        response.sendStatus('OK');
      },
      error: function(user, error) {
        response.send(error);
      }
    });
});

module.exports = router;
