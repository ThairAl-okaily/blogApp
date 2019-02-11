

const express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      app = express();



//app config 
mongoose.connect("mongodb://localhost/restfull_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




//SCHEMA , mongoose/model config
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {
          type: Date, 
          default: Date.now
        }

});
let Blog = mongoose.model(Blog, blogSchema);
 

//RESTful routs 







// node server
const http = require('http');
const port = 4000;
const hostname = '127.0.0.1'; 
const server = http.createServer((request, respond) => {
respond.statusCode = 200;
respond.setHeader('Content-Type', 'text/plain');
respond.end("Hello");
});
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

