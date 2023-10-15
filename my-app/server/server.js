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
app.post("/addCommentTo/:postId", (req, res) => {
  let comment = req.body;
  let id = req.params.postId;

  if(!posts[id].comments){
    posts[id].comments = [];
  }

  posts[id].comments.push(comment);

  res.send("ok...");
});

app.get("/scrapbook/:userId", (req, res) => {
  let user = users[req.params.userId];

  let postPhotos = [];
  let seen = {};

  for(let i of user.posts){
    for(let j of i.photos){
      if(!seen[j.url]){
        postPhotos.push(j.url);
        seen[j.url] = true;
      }
    }
  }

  let urls = [];
  let ids = [];
  while(ids.length < 4 && ids.length < postPhotos.length){
    let num = ~~(Math.random() * postPhotos.length);
    if(ids.indexOf(num) == -1){
      ids.push(num);
    }
  }

  for(let i of ids){
    urls.push("http://localhost:8080/" + postPhotos[i]);
  }


//scale images to a fixed width, then crop with code :(

  res.send(`
  <head><style>
    canvas{
      height: 11in;
      width: 8.5in;
    }
    img{
      width: 200px;
      height: 100px;
      display: none;
    }
  </style></head>
  <body>
    <img id="img0" src=${urls[0]}>
    <img id="img1" src=${urls[1]}>
    <img id="img2" src=${urls[2]}>
    <img id="img3" src=${urls[3]}>
    <img id="tape" src="http://localhost/tape.png">
    <img id="cover" src="http://localhost/cover.png">
  </body>
  <script>
  setTimeout(()=>{
    let urls = ${JSON.stringify(urls)};
    let c = document.createElement("canvas");
    document.body.append(c);

    let ctx = c.getContext("2d");
    let w = c.width = 8.5*window.innerHeight/5;
    let h = c.height = 11*window.innerHeight/5;
    let tape = document.getElementById("tape");
    let cover = document.getElementById("cover");

    ctx.fillStyle = "#eeccff";
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = "#ffe2c9";
    ctx.fillRect(0,h/2,w,h/2);

    let imgWidth = w/2 - w/8;

    let imgs = [];
    let scales = [];
    let widths = [];
    let imgCoords = [
      [w/16,h/2 + 100],
      [w/16,h*3/4+50],
      [9*w/16,h/2+100],
      [9*w/16,h*3/4+50]
    ];
    let tapeCoords = [
      [0,h/2 + 25],
      [0,h*3/4 - 25],
      [8*w/16,h/2+25],
      [8*w/16,h*3/4-25]
    ]
    for(let i = 0; i < 4; i++){
      imgs.push(document.getElementById("img" + i));
      scales[i] = imgWidth / imgs[i].width;
      widths[i] = imgs[i].width;

      ctx.drawImage(imgs[i],0,0,widths[i],widths[i]*5/8, ...imgCoords[i],imgWidth, imgWidth*5/8);
      ctx.drawImage(tape, ...tapeCoords[i], w/2, w/2*5/8);
    }
    ctx.drawImage(cover, 0, 0, w/2, cover.height/cover.width*w/2)

    window.print();
  }, 100);
  </script>`);
});

app.listen(8080);

