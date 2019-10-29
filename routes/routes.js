/* jshint esversion: 6 */ 
/* jshint esversion: 8 */ 
const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const Bitly = require('bitlyapi');
const bitly = new Bitly('fd0a57a9269bf1d523ec4bd38c18f0812c444f04'); // Shorten URL
const router = express.Router(); 

function scraper(sUrl, cr1, cr2){
var extract = []; // Array of links and titles
// sURL - Url to scrape
        request (sURL, function(error, response, html){
        const $ = cheerio.load(html); //load the page 
            $(".rail-article-title")
              .each(function (i, element) {
                var link = $(this).children("a").attr("href"); // Scrape the link from the DOM 
                    var title = $(this).children("a").text().trim(); // Scrape the title from the DOM

                        bitly.shorten(link).then(function(response) { 
                                link = response.data.url; // Grab the Shortened link from the Bitly API
                                console.log('Link is : '+link+"  Title: "+title);
                                extract.push({title: title,link: link}); // Add title and link to the array
                                }, 
                                function(error) {
                                throw error;
                                });
                });
        });
}


app.get("/scrape", function(req, res) {

        function skraper(srce,sURL,urlSwitch,skrapeParm) {
          // urlSwitch (boolean) is for URL scrapes that require their base url as a prefix 
          // skrapeParm the scrape search term 
            console.log("\n***********************************\n" +
                        "Scraping top stories from " +srce+"."+
                        "\n***********************************\n");
        
            request (sURL, function(error, response, html) { 
              var $ = cheerio.load(html);
                    $(skrapeParm).each(function(i, element) {
                      var link = $(this).children("a").attr("href");
                        var title = $(this).children("a").text().trim(); 
                         // format the Title
                         
                            title = title.replace(/\t|\n/g, "");  // strip out certain characters
                            if (urlSwitch) link = sURL + link; // If URL root is required.
        
                            if (title.indexOf('(UPI) --') > -1 ) 
                                      title = title.substring(title.indexOf('(UPI) --')+8,title.length);
        
                            if (title.length > 65) 
                                title = title.substring(0,64); // format title if necessary
                                title = title.trim(); // Trim Title
                            // Create shareable URL
        
                            googl.shorten(link).then(function (shortUrl) { 
                                  if (sURL && title && link)
                                        {
                                           var outPut = {};
                                           outPut.source = srce;
                                           outPut.title = title; 
                                           outPut.link = shortUrl;
        
                                           var rekord = new Article(outPut);
                                             rekord.save(function(err,doc)  { 
                                               if (err){
                                                 console.log(err);
                                                      }
                                              else {
                                                 console.log(doc);
                                                    }
                                                        }); //Write 
                                                    }
                                        }).catch(function (err) {
                                            console.error(err.message);
                                    }); //googl.shorten error message
                              }, function(error) {
                                    throw error;
                          });// Scrape              
                  }); // Request
        } // skraper



        skraper("Reuters","http://www.reuters.com/",true,".article-heading");
// skraper("UPI","http://www.upi.com/",false,".story");
// skraper("Deutsche Welle","http://www.dw.com/",true,".news");
skraper("Bloomberg","https://www.bloomberg.com/",true,".top-news-v3-story-headline");
skraper("Time","http://www.time.com/",true,".rail-article-title");

res.send("Scrape Complete");

});

// Read 
app.get("/articles", function(req, res) {
    Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

app.post("/articles/:id", function(req, res) {
  var newNote = new Note(req.body);

  newNote.save(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id }).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
    }
  });
});


module.exports = router; // Export 