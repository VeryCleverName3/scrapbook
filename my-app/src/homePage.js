import Post from "./post.js";
import Header from "./header.js";
import Tag from "./tag.js"

export default function HomePage({user, posts}) {
    return (
        <>
            <Header attachment={user.profilePicture}/>
            <div className="posts">
                {posts.map((post) => (
                    <Post 
                    user={post.user}
                    location={post.location}
                    date={post.date}
                    attachments={post.attachments}
                    description={post.description}
                    tags={post.tags}
                    />
                 ))}
            </div>

        </>
    );
}