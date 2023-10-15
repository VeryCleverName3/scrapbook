import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useState } from "react";

export default function SignUpPage() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [error, setError] = useState(null); // Add an error state

  async function submit() {
    let username = document.getElementById("usernameBox").value;
    let password = document.getElementById("passwordBox").value;
    let pass2 = document.getElementById("passwordBox2").value;

    if (password === pass2) {
      let res = await fetch(`http://${window.location.hostname}:8080/makeUser`, {
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
        navigate("/home"); // Navigate to the home page on success
      } else {
        localStorage.username = "";
        setError("Username already taken."); // Set the error message
      }
    } else {
      setError("Passwords do not match."); // Set an error message
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
        <h1 style={{ fontSize: "4em" }}>scrapbook</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            minWidth: "300px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ margin: "0px", fontSize: "18px" }}>Username</h4>
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
            <h4 style={{ marginBottom: "0px", fontSize: "18px" }}>Password</h4>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ margin: "0px", marginTop: "20px", fontSize: "18px" }}>
              Confirm Password
            </h4>
            <input
              id="passwordBox2"
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
              marginBottom: "30px",
              width: "100%",
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
            <b>Sign Up</b>
          </button>
          
            <div className="log-in-link"><h4> Already on scrapbook? <a className="links" href="/login">Log in</a></h4></div>

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
        
      </div>
    </>
  );
}
