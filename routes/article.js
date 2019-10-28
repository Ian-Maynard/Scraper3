/* jshint esversion: 6 */ 
/* jshint esversion: 8 */ 


const express = require("express");
// var query = require("../controllers/controller")
var cheerio = require("cheerio");
var request = require("request");
var Bitly = require('bitlyapi');
var bitly = new Bitly('fd0a57a9269bf1d523ec4bd38c18f0812c444f04'); // Shorten URL
var router = express.Router();

function scraper(sURL,cr1,cr2) {
var time = []; // Array of articles and Notes for display
request (sURL, function(error, response, html) { 
  var $ = cheerio.load(html);
  $(".rail-article-title").each(function(i, element)  {
    var link = $(this).children("a").attr("href");   // Get the link 
    var title = $(this).children("a").text().trim(); // Get the title 
        bitly.shorten(link).then(function(response) { 
                  link = response.data.url;
                  console.log('Link is : '+link+"  Title: "+title);
                  time.push({
                    title: title,
                    link: link
                  });
                }, 
                function(error) {
                   throw error;
                });
  })
});

}
