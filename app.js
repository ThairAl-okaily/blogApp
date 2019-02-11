

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
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {
          type: Date, 
          default: Date.now
        }

});
const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "test blog",
//     image: "https://unsplash.com/photos/ukzHlkoz1IE",
//     body: "Hello this is blog post "
// });
 

//RESTful routs 
app.get("/", (req, res) =>{
    res.redirect("/blogs");
});


app.get("/blogs", (req, res) =>{
    Blog.find({}, (err, Blogs) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index", {blogs: blogs});
        }
    });
});





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

