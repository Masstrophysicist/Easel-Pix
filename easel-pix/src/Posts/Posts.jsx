import { Link } from "react-router";
import { PostImageEditor } from "./PostImageEditor";

const Posts = ({ posts, user, createLineItem, updatePost }) => {
  return (
    <div>
      <h2>{posts.title}</h2>
      <br />
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}></Link>
            <img src={post.image} />
            <PostImageEditor updatePost={updatePost} post={post} />
            {user.id ? (
              <button
                onClick={() => {
                  createLineItem(post);
                }}
              >
                Post
              </button>
            ) : (
              <p>Log in for post</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
