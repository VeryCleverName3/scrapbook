import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Tag from "./tag";
import { useState } from "react";
import Comment from "./comment";

export default function Post({
  user,
  location,
  date,
  attachments,
  description,
  tags,
  index,
  postId,
  comments,
}) {
  // Assuming you have a function to format date and time
  // let detailed = false;
  let trimmedTags = tags;
  let moreTags = 0;
  if (trimmedTags && trimmedTags.length > 3) {
    moreTags = tags.length - 3;
    trimmedTags = tags.slice(0, 3);
  }
  let tagsHTML = trimmedTags.map((user) => {
    return <Tag user={user} />;
  });
  let nontrimmedTagsHTML = tags.map((user) => {
    return <Tag user={user} />;
  });

  let moretagString = "+" + moreTags.toString();
  if (moreTags > 0) {
    moreTags = (
      <div className="more-tag-bubble">
        <div className="more-tag-text">{moretagString}</div>
      </div>
    );
  } else {
    moreTags = <div></div>;
  }

  let [detailed, setDetailed] = useState(false);

  const handleClick = () => {
    setDetailed((detailed = !detailed));
  };
  let backgroundColors = ["#E5BBFF", "#D5D1FF", "#D1E3FF"];

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  let [comments2, setComments] = useState([]);
  comments2 = comments;

  const handleCommentSubmit = async () => {
    // setComments(comments2, comments);
    if (newComment.trim() !== "") {
      // setComments([...comments, newComment]); // Add the new comment to the comments array TODO: CHANGE
      setNewComment(""); // Clear the input field after submitting the comment
      console.log(newComment);
      let res = await fetch(
        `http://${window.location.hostname}:8080/addCommentTo/${postId}`,
        {
          method: "POST",
          body: JSON.stringify({
            username: localStorage.username,
            text: newComment,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
    }

    let postInfo = JSON.parse(
      await (
        await fetch(`http://${window.location.hostname}:8080/getPost/${postId}`)
      ).text()
    );
    setComments(comments2, postInfo.comments);
    window.location.reload();
    // console.log()
    // comments2 = postInfo.comments;
  };

  return (
    <div
      className="post"
      style={{
        backgroundColor: backgroundColors[index % backgroundColors.length],
      }}
      onClick={handleClick}
    >
      <div className="post-header">
        <div className="post-user-info-wrapper">
          <img src={user.profilePicture} alt={`${user.username}'s Profile`} />
          <div className="user-info">
            <h3>{user.username}</h3>
            <div className="info-mobile">
              <p>{date.toLocaleTimeString()}</p>
              <p>{location}</p>
            </div>
          </div>
        </div>

        <div className="right-post-info">
          <p>{date.toLocaleTimeString()}</p>
          <p>{location}</p>
        </div>
      </div>
      <div className="post-content">
        {attachments.length > 0 && (
          <Carousel showStatus={false} showThumbs={false}>
            {attachments.map((attachment, index) => (
              <div key={index}>
                <img
                  className="post-image"
                  src={attachment}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        )}
        {/* You can render other content of the post here */}
      </div>
      <div className="tag-container">
        {!detailed && tagsHTML}
        {!detailed && moreTags}
        {detailed && nontrimmedTagsHTML}
      </div>
      <div className="post-footer">
        <div className="tagged-users">
          <p>
            {!detailed &&
              description &&
              (description.length < 250
                ? description
                : description.substring(0, 247) + "...")}
            {detailed && description}
          </p>
        </div>
        <div
          className="new-comment"
          style={{ display: "flex", gap: "5px", marginTop: "15px" }}
        >
          <textarea
            name="content"
            form="create-scrap-form"
            className="comment-textbox"
            id="comment-textbox-id"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Comment..."
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            style={{
              border: "none",
              borderRadius: "50%",
            }}
          >
            &gt;
          </button>
        </div>
        {/* need fix map each username and comment sjhdbkaw */}
        {detailed && (
          <div className="posted-comments">
            {console.log(comments2)}
            {comments2.map((comment) => (
              <Comment user={comment.username} comment={comment.text} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
