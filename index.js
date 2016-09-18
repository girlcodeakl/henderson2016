//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var database = null;
//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list of ideas
var posts = [];
var idea = {};
idea.likes = 0;
idea.id = 1001;
idea.url = "https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/30423_pets-products_january-site-flip_3-cathealth_short-tile_592x304._CB286975940_.jpg"
idea.text = "Love - A";
idea.time = new Date();
posts.push(idea);

//let a client GET the list of ideas
var sendIdeasList = function (request, response) {
  response.send(posts);
}
app.get('/ideas', sendIdeasList);

//let a client POST new ideas
var saveNewIdea = function (request, response) {
  console.log(request.body.idea); //write it on the command prompt so we can see
  console.log(request.body.author);
  console.log(request.body.url);


  var idea = {};
  idea.likes = 0;
idea.text = request.body.idea;
idea.author = request.body.author;
idea.url = request.body.url;
if (idea.url===""){
  idea.url="https://thumbs.dreamstime.com/thumb_659/6599242.jpg"


}
images {
    max-width:20px;
}

idea.id = Math.round(Math.random() * 10000);
idea.time = new Date();
posts.push(idea);
  response.send("thanks for your idea. Press back to add another");


  var dbPosts = database.collection('posts');
dbPosts.insert(idea);



var deleteIdea = function (request, response) {
  console.log(request.body.Id); //write it on the command prompt so we can see
  response.send("Thanks For Deleting!");

  var dbPosts = database.collection('posts');
  dbPosts.deleteMany({ id : parseInt(request.body.Id) })
for (var i=0; i < posts.length; i++) {
  var post = posts[i];
  if (post.id === parseInt(request.body.Id)) {
    posts.splice(i, 1);
  }
}
//dbPosts.insert(idea);

}
app.post('/ideas', saveNewIdea);
app.post('/delete', deleteIdea);

app.post("/liked", function (req, res) {
    //code goes here
    console.log(req.body.postId);
   var searchId = req.body.postId;
   var results = posts.filter(function (post) { return post.id == searchId; });
   if (results.length > 0) {
     idea = results[0]
  idea.likes = idea.likes + 1}
console.log(results)
res.send(idea);

});

//listen for connections on port 3000
app.get('/idea', function (req, res) {
   var searchId = req.query.id;
   console.log("Searching for post " + searchId);
   var results = posts.filter(function (post) { return post.id == searchId; });
   if (results.length > 0) {
     var post = results[0]
     res.send(post);
   } else {
   res.send(null);
   }
});

app.listen(process.env.PORT || 3000);
console.log("How may I listen to you?");
var mongodb = require('mongodb');
var uri = 'mongodb://girlcode:hats123@ds029476.mlab.com:29476/girlcode-henderson';
mongodb.MongoClient.connect(uri, function(err, newdb) {
  if(err) throw err;
  console.log("yay we connected to the database");
  database = newdb;
  var dbPosts = database.collection('posts');
  dbPosts.find(function (err, cursor) {
    cursor.each(function (err, item) {
      if (item != null) {
        posts.push(item);
      }
    });
  });
});
