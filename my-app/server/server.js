let express = require("express");
let app = express();
let multer = require("multer");
let fs = require("fs");

app.use(express.json());

app.use(express.static(`${__dirname}/meerkatDB/images`));

let posts = {};
let users = {};
users = JSON.parse(fs.readFileSync(`${__dirname}/meerkatDB/text/users.JSON`));
posts = JSON.parse(fs.readFileSync(`${__dirname}/meerkatDB/text/posts.JSON`));
let numPosts = 0;

function updateDatabase(){
    fs.writeFileSync(`${__dirname}/meerkatDB/text/users.JSON`, JSON.stringify(users));
    fs.writeFileSync(`${__dirname}/meerkatDB/text/posts.JSON`, JSON.stringify(posts));
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

    if(users[userData.username] == undefined){
        users[userData.username] =  {name: userData.username, password: userData.password, profilePicUrl: "", posts: []}; 
        res.send("ok");
    } else {
        res.send("username already taken!!");
    }
});

app.post("/login", (req, res) => {
    let data = req.body;
    if(users[data.username].password == data.password){
        res.send("succesfully logged in");
    } else {
        res.send("bad login, maybe incorrect password but who knows");
    }
});

let postingForm = multer({dest:"meerkatDB/images/images"});

/*
post has inputs of names:
title: title of post
content: text content of post
images: list of images added in the post
includedUsers: other users included in the post
userCookie: username of the poster

*/

//where user creates a post
app.post("/post", postingForm.array("images", 5), (req, res, next) => {
    let photos = req.files;
    let text = req.body;
    let includedUsers = text.includedUsers.split(","); //includedUsers is a comma separated list
    includedUsers.push(text.userCookie);

    for(let photo of photos){
        photo.url = `images/${photo.filename}`;
    }

    let post = {text, photos};

    console.log(post);
    post.id = numPosts++;
    posts[post.id] = post;

    for(let i of includedUsers){
        if(users[i] != undefined){
            users[i].posts.push(post);
        }
    }

    updateDatabase();
    res.send("yo!");
});

app.get("/getPost/:id", (req, res) => {
    res.send(JSON.stringify(posts[req.params.id]));
});

app.get("/postIdsFor/:userId", (req, res) => {
    let postIds = [];
    for(let i of users[req.params.userId].posts){
        postIds.push(i.id);
    }

    res.send(JSON.stringify(postIds));
});

app.listen(8080);