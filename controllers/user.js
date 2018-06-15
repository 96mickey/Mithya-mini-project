var db = require('../models/user');
var passport = require("passport");

exports.userRegister = function(req, res){
    db.register(new db({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
};

exports.getRegistrationForm = function(req, res){
    res.render("register");
};

exports.getLoginForm = function(req, res){
    res.render("login");
};

exports.userLoginDone = function(req, res){
    
};

module.exports = exports;