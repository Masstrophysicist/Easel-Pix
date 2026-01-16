export default function Post({ post }) {
  return (
    <div key={post.id} className="feedPost">
      <img src={post.image} alt="post art" className="feedImage" />
      <h4 className="postTitle">{post.title}</h4>

      <p className="postAuthor">by {post.name}</p>

      <p className="postDesc">{post.desc}</p>

      <div className="postActions">
        <div className="postActions">
          <button className="iconBtn">♡</button>
          <button className="iconBtn">💬</button>
        </div>
      </div>
    </div>
  );
}
