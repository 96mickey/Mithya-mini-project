var express                 = require("express"),
    app                     = express(),
    bodyparser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    localStratergy          = require("passport-local"),
    indexRoutes             = require("./routes/index"),
    hotelRoutes         = require("./routes/hotel"),
    hotelGeneralRoutes         = require("./routes/hotelGeneral");
    
    
mongoose.connect("mongodb://localhost/mithya");
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// passport and session configuration
app.use(require("express-session")({
    secret: "Best framework ever!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//function to use user details within website
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


//routes
app.use(indexRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/hotel', hotelGeneralRoutes);

// port details
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Mithya Server HAS STARTED!");
});