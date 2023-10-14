import Post from "../post.js";
import Header from "../header.js";
import Tag from "../tag.js";

import { useEffect, useState } from "react";

import HomePage from "../homePage.js";

const dummyUser = {
  username: "john_doe",
  profilePicture:
    "https://i.pinimg.com/736x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg",
};

const dummyPost = {
  user: dummyUser,
  location: "New York, NY",
  date: new Date(),
  attachments: [
    "https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=612x612&w=0&k=20&c=qYST1TAGoQGV_QnB_vMd4E8jdaQUUo95Sa2JaKSl_-4=",
    "https://media.istockphoto.com/id/1384618716/photo/group-of-happy-friends-taking-selfie-pic-outside-happy-different-young-people-having-fun.webp?b=1&s=170667a&w=0&k=20&c=wWtYoTCWJUZqJK-ehBglTVxA4PtuDUZf1FVWLP2ddcA=",
    "https://media.istockphoto.com/id/514325215/photo/say-cheese-for-success.jpg?s=612x612&w=0&k=20&c=Lg2vKGMNPEY-VAPxvz0hmSmbqIk-MU-oVEaWikyy7QU=",
  ],
  tags: [dummyUser, dummyUser, dummyUser],
  description:
    "Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post",
};
const dummyPost2 = {
  user: dummyUser,
  location: "New York, NY",
  date: new Date(),
  attachments: [
    "https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=612x612&w=0&k=20&c=qYST1TAGoQGV_QnB_vMd4E8jdaQUUo95Sa2JaKSl_-4=",
    "https://media.istockphoto.com/id/1384618716/photo/group-of-happy-friends-taking-selfie-pic-outside-happy-different-young-people-having-fun.webp?b=1&s=170667a&w=0&k=20&c=wWtYoTCWJUZqJK-ehBglTVxA4PtuDUZf1FVWLP2ddcA=",
    "https://media.istockphoto.com/id/514325215/photo/say-cheese-for-success.jpg?s=612x612&w=0&k=20&c=Lg2vKGMNPEY-VAPxvz0hmSmbqIk-MU-oVEaWikyy7QU=",
  ],
  tags: [dummyUser, dummyUser, dummyUser],
  description: "Here is a short text.",
};
const posts = [dummyPost, dummyPost2, dummyPost2];

export default function MainPage() {
  let user = localStorage.username;

  let [posts, setPosts] = useState([]);

  //let posts = [];

  let defaultPicUrl =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80";
  //defaultPicUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2F29bribri29%2Fbasic-pfp%2F&psig=AOvVaw0-ZgFkx3ykAxLT6TSxQmip&ust=1697391016929000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIio57aI9oEDFQAAAAAdAAAAABAE";
  defaultPicUrl =
    "https://i.pinimg.com/736x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg";
  async function getData() {
    let postIds = JSON.parse(
      await (await fetch(`http://localhost:8080/postIdsFor/${user}`)).text()
    );

    let posts = [];

    for (let i of postIds) {
      let postInfo = JSON.parse(
        await (await fetch(`http://localhost:8080/getPost/${i}`)).text()
      );

      if (postInfo.text.userCookie) {
        let userData = {
          username: postInfo.text.userCookie,
          profilePicture: defaultPicUrl,
        };
        let location = postInfo.text.location;
        let date = new Date(1 * postInfo.text.time);
        let attachments = [];
        for (let j of postInfo.photos) {
          attachments.push(`http://localhost:8080/${j.url}`);
        }

        let description = postInfo.text.content;

        let tags = [];
        for (let j of postInfo.text.includedUsers.split(",")) {
          tags.push({ username: j, profilePicture: defaultPicUrl });
        }

        posts.push(
          <Post
            user={userData}
            location={location}
            date={date}
            attachments={attachments}
            description={description}
            tags={tags}
          />
        );
      }
    }

    setPosts(posts);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header
        attachment={
          "https://i.pinimg.com/736x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg"
        }
        makePost={true}
      />
      {posts}
    </>
  );
}
