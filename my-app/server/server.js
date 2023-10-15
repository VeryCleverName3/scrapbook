let express = require("express");
let app = express();
let multer = require("multer");
let fs = require("fs");
let cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(express.static(`${__dirname}/meerkatDB/images`));

let posts = {};
let users = {};
users = JSON.parse(fs.readFileSync(`${__dirname}/meerkatDB/text/users.JSON`));
posts = JSON.parse(fs.readFileSync(`${__dirname}/meerkatDB/text/posts.JSON`));
let numPosts = 0;
numPosts = Object.keys(posts).length;

function updateDatabase() {
  fs.writeFileSync(
    `${__dirname}/meerkatDB/text/users.JSON`,
    JSON.stringify(users)
  );
  fs.writeFileSync(
    `${__dirname}/meerkatDB/text/posts.JSON`,
    JSON.stringify(posts)
  );
}

//testing, not for anything
app.get("/", (req, res) => {
  res.send(`
        <form action="/post" method="POST" enctype="multipart/form-data">
        <label for="fname">Title:</label><br>
        <input type="text" id="fname" name="title"><br>
        <label for="lname">Content:</label><br>
        <input type="text" id="lname" name="content"><br>
        <label for="pictures">Pictures:</label><br>
        <input type="file" id="pictures" name="images" multiple><br>
        <input type="hidden" name="userCookie" value="bobama7"><br>
        <label for="otherusers">Other Users in Photo:</label>
        <input type="text" id="otherUsers" name="includedUsers">
        <input type="submit" value="Submit">
        </form>
    `);
});

app.post("/makeUser", (req, res) => {
  let userData = req.body;

  if (users[userData.username] == undefined) {
    users[userData.username] = {
      name: userData.username,
      password: userData.password,
      profilePicUrl: "",
      posts: [],
    };
    if (posts[0]) {
      users[userData.username].posts.push(posts[0]);
    }
    res.send("good");
  } else {
    res.send("username already taken!!");
  }
  updateDatabase();
});

app.post("/login", (req, res) => {
  let data = req.body;
  if (users[data.username]) {
    if (users[data.username].password == data.password) {
      res.send("good");
    } else {
      res.send("badWrongPassword");
    }
  } else {
    res.send("badWrongUsername");
  }
});

let postingForm = multer({ dest: "meerkatDB/images/images" });

/*
post has inputs of names:
title: title of post
content: text content of post
images: list of images added in the post
includedUsers: other users included in the post
userCookie: username of the poster
location: Klaus College of Computing
*/

//where user creates a post
app.post("/post", postingForm.array("images", 5), (req, res, next) => {
  let photos = req.files;
  let text = req.body;
  if (text.userCookie == "") {
    res.send("not logged in!");
    return;
  }
  let includedUsers = text.includedUsers.replaceAll(" ", "").split(","); //includedUsers is a comma separated list
  includedUsers.push(text.userCookie);

  for (let photo of photos) {
    photo.url = `images/${photo.filename}`;
  }

  let post = { text, photos };

  post.text.time = Date.now();
  post.id = numPosts++;
  posts[post.id] = post;

  for (let i of includedUsers) {
    if (users[i] != undefined) {
      users[i].posts.push(post);
    }
  }

  updateDatabase();
  res.send("<script>window.location = 'http://scrapbookgeorgia.tech'</script>");
});

app.get("/getPost/:id", (req, res) => {
  res.send(JSON.stringify(posts[req.params.id]));
});

app.get("/listOfUsers", (req, res) => {
  res.send(JSON.stringify(Object.keys(users)));
});

app.get("/postIdsFor/:userId", (req, res) => {
  let alreadySeen = {};
  if (users[req.params.userId]) {
    let postIds = [];
    for (let i of users[req.params.userId].posts) {
      if (alreadySeen[i.id] == undefined) {
        postIds.push(i.id);
        alreadySeen[i.id] = true;
      }
    }

    postIds.sort((a, b) => {
      return b - a;
    });

    res.send(JSON.stringify(postIds));
  } else {
    res.send("[]");
  }
});


//comment post request body format: {username, text}
app.post("/addCommentTo/:postId", (res, req) => {
  let comment = req.body;
  let id = req.params.postId;

  if(!posts[id].comments){
    posts[id].comments = [];
  }

  posts[id].comments.push(comment);
});

app.listen(8080);
