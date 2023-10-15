export default function Comment(user, comment) {
  user = {
    username: "uanand6",
    profilePic:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80",
  };
  comment = "kjdfgdhnghdighsdfgidshgsg";

  return (
    <>
      <div
        className="comment"
        style={{
          backgroundColor: "white",
          padding: "8px",
          borderRadius: "12px",
          marginTop: "10px",
        }}
      >
        <div
          className="comment-header"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <img
            style={{ height: "25px", width: "25px", borderRadius: "50%" }}
            src={user.profilePic}
          ></img>
          <h5 style={{ margin: "0px" }}>{user.username}</h5>
        </div>
        <p style={{ fontSize: "0.8em", margin: "0px", paddingTop: "4px" }}>
          {comment}
        </p>
      </div>
    </>
  );
}
