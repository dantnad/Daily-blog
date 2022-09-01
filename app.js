//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const posts = [
  {
    title: "Day 1",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis purus sit amet volutpat consequat mauris nunc. Lobortis feugiat vivamus at augue eget arcu dictum varius. Libero nunc consequat interdum varius sit amet mattis. Egestas sed sed risus pretium. Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor. Rhoncus urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet. Nisl rhoncus mattis rhoncus urna neque. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Faucibus nisl tincidunt eget nullam non nisi est. Ut sem nulla pharetra diam sit. Sit amet tellus cras adipiscing enim eu. Magna fermentum iaculis eu non. Est sit amet facilisis magna etiam tempor orci eu lobortis. Dui accumsan sit amet nulla facilisi. Interdum varius sit amet mattis vulputate enim nulla. Mauris a diam maecenas sed enim.",
  },
  {
    title: "Day 2",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis purus sit amet volutpat consequat mauris nunc. Lobortis feugiat vivamus at augue eget arcu dictum varius. Libero nunc consequat interdum varius sit amet mattis. Egestas sed sed risus pretium. Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor. Rhoncus urna neque viverra justo nec. Libero justo laoreet sit amet cursus sit amet. Nisl rhoncus mattis rhoncus urna neque. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Faucibus nisl tincidunt eget nullam non nisi est. Ut sem nulla pharetra diam sit. Sit amet tellus cras adipiscing enim eu. Magna fermentum iaculis eu non. Est sit amet facilisis magna etiam tempor orci eu lobortis. Dui accumsan sit amet nulla facilisi. Interdum varius sit amet mattis vulputate enim nulla. Mauris a diam maecenas sed enim.",
  },
];

function Post(title, post) {
  (this.title = title), (this.post = post);
}

function findPost(title){
  return posts.find(function(post){
    return _.lowerCase(post.title) === _.lowerCase(title)
  })
}



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    posts: posts,
  });
});
app.get("/about", function (req, res) {
  res.render("about", {
    content: aboutContent,
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", {
    content: contactContent,
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:post", function (req, res) {
  const post = findPost(req.params.post);
  if(post === undefined){
    res.render('post', {
      title: '404 Post not found',
      post: 'Seems like that post does not exist'
    })
  }else{
    res.render("post", {
      title: post.title,
      post: post.post,
    });
  }
});

app.post("/compose", function (req, res) {
  posts.push(new Post(req.body.blogTitle, req.body.blogPost));
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});