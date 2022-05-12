
const express = require("express");
const Feed = require('rss-in-json');
const app = express();
const cluster = require("cluster")
const os = require("os");

console.log(os.cpus().length);

const cpuNumber = os.cpus().length;

app.set("view engine","ejs");
app.use("/script",express.static('script'))
app.use("/carrier",express.static('carrier'))
app.use("/style",express.static('style'))
app.use("/assets",express.static('assets'))

app.get("/query_string",(req,res)=>{

    res.writeHead(200,{"Content-type" : "application/json"}); 

    Feed.convert('https://www.pulse.com.gh/news/rss')
        .then(function(json) {

            var data_pipe = json;
            res.end(JSON.stringify(data_pipe));
            
        })
    .catch(function(err) {
        console.log(err);
    });

    console.log("API CONVERSION PROCESS ID: " + process.pid)

});


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

    console.log("API CONVERSION DATA PROCESS ID "+ process.pid)
    // cluster.worker.kill()

});

if(cluster.isMaster){
    for(let i = 0; i<cpuNumber; i++){
        cluster.fork();
        // console.log(cpuNumber + " CPU LENGTH ");
    }

    cluster.on("exit",(worker,code,signal)=>{
        cluster.fork()
    })
    
}else{
    app.listen(1010,()=>{
        console.log(`server running on cpu of id: ${process.pid} localhost:1010/`);
    });
}