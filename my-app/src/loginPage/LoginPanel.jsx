import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPanel() {
  const navigate = useNavigate(); // Get the navigate function

  const [error, setError] = useState(""); // State for error messages

  async function submit() {
    let username = document.getElementById("usernameBox").value;
    let password = document.getElementById("passwordBox").value;
    let res = await fetch(`http://${window.location.hostname}:8080/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let result = await res.text();

    if (result === "good") {
      localStorage.username = username;
      navigate("/home"); // Use navigate to redirect to /home on successful login
    } else {
      localStorage.username = "";
      setError("Wrong username and password.");
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#CC00FF",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "4em", marginTop: "0px" }}>scrapbook</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            minWidth: "300px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ margin: "0px" }}>Username</h4>
            <textarea
              id="usernameBox"
              rows="1"
              style={{
                border: "none",
                borderRadius: "5px",
                resize: "none",
                padding: "8px",
                margin: "0",
                boxSizing: "border-box",
                fontSize: "18px",
              }}
            ></textarea>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ marginBottom: "0px" }}>Password</h4>
            <input
              id="passwordBox"
              type="password"
              style={{
                border: "none",
                borderRadius: "5px",
                padding: "8px",
                margin: "0",
                boxSizing: "border-box",
                fontSize: "18px",
              }}
            />
          </div>
          <button
            style={{
              marginTop: "60px",
              width: "100%", // Make the button take 100% width
              backgroundColor: "white",
              color: "#CC00FF",
              border: "none",
              borderRadius: "25px",
              padding: "16px 16px",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => {
              submit();
            }}
          >
            <b>Log In</b>
          </button>
          {error && (
            <p
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Align the error message in the center
              }}
            >
              {error}
            </p>
          )}
        </div>
        <h4> New to scrapbook? <a className="links" href="/signup">Join now</a></h4>
      </div>
    </>
  );
}
