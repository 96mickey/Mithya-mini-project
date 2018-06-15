var express= require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var controllers = require("../controllers/user");


//add new hotel
router.get("/", function(req,res){
    res.render("hotel/createHotel");
})

//Auth ROute
router.route('/register')
    .get(controllers.getRegistrationForm)
    .post(controllers.userRegister);


//login Routes
router.route('/login')
    .get(controllers.getLoginForm)
    .post(passport.authenticate("local", 
                            {
                                successRedirect : "/",
                                failureRedirect : "/login"
                            }), controllers.userRegister);


//logout routes
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
});



module.exports = router;
