import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function Post({ user, location, attachments, tags }) {
  // Assuming you have a function to format date and time
  const currentDate = new Date(); // Implement formatDateTime as needed
  return (
    <div className="post">
      <div className="post-header">
        <img src={user.profilePicture} alt={`${user.username}'s Profile`} />
        <div className="user-info">
          <h3>{user.username}</h3>
          <p>{currentDate.toLocaleTimeString()}</p>
          {location && <p>{location}</p>}
        </div>
      </div>
      <div className="post-content">
        {attachments.length > 0 && (
          <Carousel showStatus={false} showThumbs={false}>
            {attachments.map((attachment, index) => (
              <div key={index}>
                <img src={attachment} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        )}
        {/* You can render other content of the post here */}
      </div>
      <div className="post-footer">
        {tags.length > 0 && (
          <div className="tagged-users">
            <p>Tagged Users: {tags.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
