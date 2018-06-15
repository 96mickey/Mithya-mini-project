var express= require("express");
var router = express.Router();
var Hotel = require("../models/hotel");
var middleware = require("../middleware/index.js");
var controllers = require("../controllers/hotel");


router.route('/:id')
 .get(middleware.isLoggedIn, controllers.getHotelDetails);
 
router.route('/add/:id')
 .get(middleware.isLoggedIn, controllers.draftHotel);
 
router.route('/confirm/:id')
 .get(middleware.isLoggedIn, controllers.confirmHotel);
 

 
 
 module.exports = router;