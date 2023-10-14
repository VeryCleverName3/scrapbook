/*
post has inputs of names:
title: title of post
content: text content of post
images: list of images added in the post
includedUsers: other users included in the post
userCookie: username of the poster
location: Klaus College of Computing
*/
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function CreatePostPage(){
    let userCookie = localStorage.username;

    console.log(userCookie);

    return (<>
    <div className="create-post-page">
        <form action="http://localhost:8080/post" method="POST" encType="multipart/form-data" id="formwithdata">
        <div className="upload">
            <div>Upload Photos (Maximum of 5) <span style={{ color: "red" }}>*</span></div>
            <label htmlFor="file-upload" className="custom-file-upload">
                <span className="fas fa-cloud-upload-alt">Select Files</span> 
            </label>
            <input id="file-upload" name="images" type="file" className="file-upload" />
        </div>

            <div className="preview">
            <p>Preview</p>
            {/* <div className="preview-carousel">
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
                </div> */}
            </div> 
            
            <div className="add-tags">
            <p>Add Tags (Maximum of 9)<span style={{color:"red"}}>*</span></p>
            <input name="includedUsers" type="text"></input>
            </div>
            
            <textarea type="text" form="formwithdata" name="content"></textarea>
            <input type="text" name="title"></input>
            
            <div className="create-button">
            {/* <input type="submit" value="Create Scrap"></input> */}

            <input type="submit" value="Create Scrap" className="create-button"></input>

        

            </div>

            <input type="hidden" value="Klaus Advanced Computing Building" name="location"></input>
            <input type="hidden" value={userCookie} name="userCookie"></input>
        </form>
        </div>
    </>)
}