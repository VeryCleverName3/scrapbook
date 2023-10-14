import Post from "../post.js";
import Header from "../header.js";
import Tag from "../tag.js"
import HomePage from "../homePage.js";

const dummyUser = {
    username: "john_doe",
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
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
    description: "Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post // Here is the LONG description of this post"
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
    description: "Here is a short text."
  };
  const posts = [dummyPost, dummyPost2, dummyPost2];


export default function MainPage() {
    return (
        <>
            <HomePage user={dummyUser} posts={posts} />
        </>
    );
}