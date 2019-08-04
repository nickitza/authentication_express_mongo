var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bodyParser = require("body-parser")

app.set("view engine", "ejs")
mongoose.connect("mongodb://localhost:27017/auth_app", {useNewUrlParser: true})

app.get('/', function(req, res){
  res.render("home")
})

app.get("/secret", function(req,res){
  res.render("secret")
})


// ======================================
app.listen(3000, function(){
  console.log("*** SERVER RUNNING ***")
})