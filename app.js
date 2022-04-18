
const express = require("express");
const Feed = require('rss-in-json');
const app = express();

app.set("view engine","ejs");
app.use("/script",express.static('script'))
app.use("/carrier",express.static('carrier'))
app.use("/style",express.static('style'))
app.use("/assets",express.static('assets'))

app.get("/page",(req,res)=>{

    Feed.convert('https://www.pulse.com.gh/news/rss')
        .then(function(json) {

            var data_pipe = json;
            
            // console.log(data_pipe.items[0].enclosures); this block of data is not accessible!!!
            // console.log(data_pipe.items[0].content_encoded); this block of data is not accessible!!!

            return res.render('page',{ info:data_pipe });
        })
    .catch(function(err) {
        console.log(err);
    });


});

app.listen(1010);