export default function Comment({ user, comment }) {
  return (
    <>
      <div
        className="comment"
        style={{
          backgroundColor: "white",
          padding: "8px",
          borderRadius: "12px",
          marginTop: "8px",
        }}
      >
        <div
          className="comment-header"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <img
            style={{ height: "25px", width: "25px", borderRadius: "50%" }}
            src="https://i.pinimg.com/736x/17/57/1c/17571cdf635b8156272109eaa9cb5900.jpg"
          ></img>
          <h5 style={{ margin: "0px" }}>{user}</h5>
        </div>
        <p style={{ fontSize: "0.8em", margin: "0px", paddingTop: "4px" }}>
          {comment}
        </p>
      </div>
    </>
  );
}
