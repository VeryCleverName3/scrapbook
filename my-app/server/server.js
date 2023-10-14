let express = require("express");

let app = express();

let multer = require("multer");

/*
POST request to make a post

*/

/*
posts need: title, content, images, likes, dateUploaded, includedUsers
*/

app.use(express.json());

app.use(express.static(`${__dirname}/meerkatDB`));

let posts = {};
let users = {};
let numPosts = 0;

//testing, not for anything
app.get("/", (req, res) => {
    res.send(`
<form action="/post" method="POST" enctype="multipart/form-data">
  <label for="fname">Title:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Content:</label><br>
  <input type="text" id="lname" name="lname">
  <label for="images">Pictures:</label><br>
  <input type="file" id="images" name="images" multiple>
  <input type="submit" value="Submit">
</form>
`);
});

let postingForm = multer({dest:"meerkatDB/images/"});
//where user creates a post
app.post("/post", postingForm.array("images", 5), (req, res, next) => {
    let photo = req.files;
    let text = req.body;
    let includedUsers = text.includedUsers;
    photo.url = `images/${photo.filename}`;

    let post = {text, photo};

    console.log(post);
    post.id = numPosts++;
    posts[post.id] = post;
    res.send("yo!");


    /*
    let post = req.body;
    let id = numPosts++;
    post.id = id;
    posts[id] = post;
    res.send("yo");
    */
});

app.get("/getPost/:id", (req, res) => {
    res.send(JSON.stringify(posts[req.params.id]));
});

app.get("/postIdsFor/:userId", (req, res) => {

});

app.listen(8080);