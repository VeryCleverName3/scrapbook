/*
post has inputs of names:
title: title of post
content: text content of post
images: list of images added in the post
includedUsers: other users included in the post
userCookie: username of the poster
location: Klaus College of Computing
*/

export default function CreatePostPage(){
    let userCookie = localStorage.username;

    console.log(userCookie);

    return (<>
        <form action="http://localhost:8080/post" method="POST" encType="multipart/form-data">
            Title:
            <input name="title"></input><br></br>
            Content:
            <input name="content"></input><br></br>
            Images:
            <input name="images" type="file"></input><br></br>
            Other Users: comma separated
            <input name="includedUsers"></input><br></br>
            <input type="hidden" value={userCookie} name="userCookie"></input><br></br>
            <input type="hidden" value="" name="location"></input><br></br>
            <input type="submit" value="Submit"></input><br></br>
        </form>
    </>)
}