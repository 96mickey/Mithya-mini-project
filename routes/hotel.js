var express = require('express');
var router = express.Router();
var controllers = require("../controllers/hotel");
var middleware = require("../middleware/index.js");

router.route('/')
 .get(middleware.isLoggedIn, controllers.getHotels)
 .post(middleware.isLoggedIn, controllers.createHotel);
 
 module.exports = router;