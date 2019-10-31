/* jshint esversion: 6 */ 
/* jshint esversion: 8 */ 

var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
// var cheerio = require("cheerio");
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Mongoose config and init
mongoose.connect("mongodb://localhost/scraperdata14"); // Mongod connection
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
}); 
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(7000, function() {
    console.log("App running on port 7000!");
  });