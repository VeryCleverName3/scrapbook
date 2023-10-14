import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function NewPostForm() {
  return (
    <>
      <div className="new-post-header"></div>
      <div className="upload">
        <p>Upload Photos (Maximum of 5)</p>
        <p className="*">*</p>
        <button id="selectFiles">Select Files</button>
      </div>

      <div className="preview">
        <p>Preview</p>
      </div>

      <div className="add-location">
        <p>Add Location</p>
      </div>

      <div className="add-tag">
        <p>Add Tags (Maximum of 9)</p> <p className="*">*</p>
      </div>

      <div className="add-description">
        <p>Add Description</p>
      </div>

      <div className="new-post-footer"></div>
    </>
  );
}
