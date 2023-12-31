import React, { useEffect, useState } from "react";
import "./index.css";
export default function Header({ attachment, makePost }) {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let user = localStorage.username;
  let url = `http://${window.location.hostname}:8080/scrapbook/${user}`;

  return (
    <div className={`sticky-header ${isSticky ? "sticky" : ""}`}>
      <div className="header-content">
        <div className="left-content">
          <a href="/home">scrapbook</a>
        </div>

        <div className="right-content">
          {makePost && (
            <a href="/makePost">
              <img height="25px" src="./createPostButton.svg" />
            </a>
          )}
          <a href={url}>
          <img
            src={attachment}
            height="35px"
            alt="Right-aligned Image"
            className="right-image"
          />
          </a>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="sticky-header">
  //     <h1>scrapbook</h1>;
  //   </div>

  // );
}
