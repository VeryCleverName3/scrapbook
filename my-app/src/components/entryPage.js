export default function Welcome() {
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
        <h1 style={{ fontSize: "3.8em", marginTop: "0px" }}>
          <b>scrapbook</b>
        </h1>
        <a href="/login">
          <button
            style={{
              backgroundColor: "white",
              color: "#CC00FF",
              border: "none",
              borderRadius: "25px",
              padding: "16px 16px",
              fontSize: "18px",
              cursor: "pointer",
              minWidth: "300px",
            }}
          >
            <b>Log In</b>
          </button>
        </a>
        <a href="/signup">
          <button
            style={{
              margin: "20px",
              backgroundColor: "white",
              color: "#CC00FF",
              border: "none",
              borderRadius: "25px",
              padding: "16px 16px",
              fontSize: "18px",
              cursor: "pointer",
              minWidth: "300px",
            }}
            onClick={() => {}}
          >
            <b>Sign Up</b>
          </button>
        </a>
      </div>
    </>
  );
}
