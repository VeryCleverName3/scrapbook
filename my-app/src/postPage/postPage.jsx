import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "../header.js";
import Select from "react-select";

export default function CreatePostPage() {
  let hostname = window.location.hostname;
  let url = `http://${hostname}:8080/post`;

  const [selectedUsers, setSelectedUsers] = useState([]);
  const maxSelection = 9;

  const [options, setOptions] = useState([]);
  async function getOptions() {
    let usernames = JSON.parse(
      await (
        await fetch(`http://${window.location.hostname}:8080/listOfUsers`)
      ).text()
    );
    console.log(userNames);

    const newOptions = usernames.map((username) => ({
      value: username,
      label: username,
    }));

    setOptions(newOptions);
  }

  useEffect(() => {
    getOptions();
  }, []);

  const handleUserSelect = (selectedOptions) => {
    if (selectedOptions.length <= maxSelection) {
      setSelectedUsers(selectedOptions);
    }
  };

  const userNames = selectedUsers.map((user) => user.value).join(", ");

  let userCookie = localStorage.username;
  let attachments = [
    "https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=612x612&w=0&k=20&c=qYST1TAGoQGV_QnB_vMd4E8jdaQUUo95Sa2JaKSl_-4=",
    "https://media.istockphoto.com/id/1384618716/photo/group-of-happy-friends-taking-selfie-pic-outside-happy-different-young-people-having-fun.webp?b=1&s=170667a&w=0&k=20&c=wWtYoTCWJUZqJK-ehBglTVxA4PtuDUZf1FVWLP2ddcA=",
    "https://media.istockphoto.com/id/514325215/photo/say-cheese-for-success.jpg?s=612x612&w=0&k=20&c=Lg2vKGMNPEY-VAPxvz0hmSmbqIk-MU-oVEaWikyy7QU=",
  ];


    function changePreview(){
      let files = document.getElementById("file-upload").files;
      let j = 0;
      for(let i of files){
        if (i && j < 3) {
          document.getElementsByClassName("post-image")[j++].src = URL.createObjectURL(i);
        }
      }
    }

    return (<>
    <Header attachment={attachments[0]}/>
    <div className="create-post-page-wrapper">
    
    <div className="create-post-page">
    
        <form id="create-scrap-form" action={url} method="POST" encType="multipart/form-data">

            <div className="upload">
              <div className="upload-text">
                Upload Photos (Maximum of 5){" "}
                <span style={{ color: "red" }}>*</span>
              </div>
              <label htmlFor="file-upload" className="custom-file-upload">
                <span className="fas fa-cloud-upload-alt">Select Files</span>
              </label>
              <input
                id="file-upload"
                name="images"
                type="file"
                className="file-upload"
                multiple
                onChange={changePreview}
              />
            </div>

            <div className="preview">
              <p>Preview</p>
              <div className="preview-carousel">
                {attachments.length > 0 && (
                  <Carousel showStatus={false} showThumbs={false}>
                    {attachments.map((attachment, index) => (
                      <div key={index} className="carousel-item">
                        <img
                          className="post-image"
                          src={attachment}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>

            <div className="add-tags">
              <p className="add-tags-text">
                Who else is in this post?{" "}
                <span style={{ color: "red" }}>*</span>
              </p>
              <Select
                isMulti
                options={options}
                value={selectedUsers}
                onChange={handleUserSelect}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
              />
            </div>

            <div className="add-description">
              <p className="add-description-text">Add Description</p>
              <textarea
                name="content"
                form="create-scrap-form"
                className="add-description-textbox"
              ></textarea>
            </div>

            <div className="create-button-div">
              <input
                type="submit"
                value="Create Scrap"
                className="create-button"
              ></input>
            </div>

            <input
              type="hidden"
              value="Klaus Advanced Computing Building"
              name="location"
            ></input>
            <input type="hidden" value={userCookie} name="userCookie"></input>
            <input type="hidden" value={userNames} name="includedUsers"></input>
          </form>
        </div>
      </div>
    </>
  );
}
