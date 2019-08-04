var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bodyParser = require("body-parser"),
    User = require("./models/user")

  mongoose.connect("mongodb://localhost:27017/auth_app", {useNewUrlParser: true})

  app.use(require("express-session")({
    secret: "Eric is a sexy babe",
    resave: false,
    saveUninitialized: false
  }))
  app.set("view engine", "ejs")
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(bodyParser.urlencoded({extended: true}))
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())

//========== 
//ROUTES
//================
app.get('/', function(req, res){
    res.render("home")
})

app.get("/secret", function(req,res){
  res.render("secret")
})

//AUTH ROUTES
app.get("/register", function(req, res){
  res.render("register")
})
app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err)
      res.render("register")
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secret")
      })
    }
  })
})    

// ============== PORT ========================
app.listen(3000, function(){
  console.log("*** SERVER RUNNING ***")
})