export default function Tag({user}) {
  let name = user.username;
  if (name.length > 10) {
    name = name.substring(0, 7) + "...";
  }
    return (
      <div className="user-tag">
        <div className="tag-left-content">
        <img src={user.profilePicture}
            alt="Left-aligned Image"
            className="tag-left-image" 
        />
        </div>

        <div className="tag-right-content">
            {name}
        </div>

      </div>
    );
  }
  