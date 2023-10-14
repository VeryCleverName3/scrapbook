import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Tag from "./tag";

export default function Post({
  user,
  location,
  date,
  attachments,
  description,
  tags,
}) {
  // Assuming you have a function to format date and time

  return (
    <div className="post">
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
        {tags.map((tag) => {
          return <Tag user={tag} />;
        })}
      </div>
      <div className="post-footer">
        <div className="tagged-users">
          <p>
            {description.length > 100
              ? description
              : description.substring(0, 97) + "..."}
          </p>
        </div>
      </div>

    </div>
  );
}
