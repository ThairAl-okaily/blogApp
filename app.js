

const express = require("express"),
      mongoose = require("mongoose"),
      expressSanitizer = require("express-sanitizer"),
      methodOveride = require("method-override"),
      bodyParser = require("body-parser"),
      app = express();



//app config 
mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOveride("_method"));
app.use(expressSanitizer());



//SCHEMA , mongoose/model config
var blogSchema = new mongoose.Schema({
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
//     image: "https://assets.wordpress.envato-static.com/uploads/2017/08/tropical-PS53BSA.jpg",
//     body: "Hello this is blog post "
// }, function (err, Tott){
//             if(err){
//                 console.log(err);
//             }
//             else {
//                 console.log("NEWLY CREATED Tott");
//                 console.log(Tott);
//             }
//  });
 

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
            res.render("index", {blogs: Blogs});
        }
    });
});

app.get("/blogs/new", (req, res) =>{
    res.render("new");
});

app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            console.log(err);
        } 
        else {
            res.redirect("/blogs");
        }
    });
});

//EDIT ROUT 
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            res.redirect("/");
        } 
        else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUT 
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, ubdatedOne) => {
        if(err) {
            res.redirect("/blogs");
        } 
        else {
            res.redirect("/blogs/" + req.params.id );
        }
    });
});




//show rout
app.get("/blogs/:id", (req, res) =>{
    Blog.findById(req.params.id, (err, foundBog) => {
        if(err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: foundBog});
        }
    });
});


//delet rout
app.delete("/blogs/:id", (req, res) =>{
    Blog.findByIdAndRemove(req.params.id, err => {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/blogs");
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

