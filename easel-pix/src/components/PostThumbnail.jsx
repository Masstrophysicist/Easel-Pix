export default function PostThumbnail({ post, index, onNewPostClick }) {
  const handleClick = () => {
    if (index === 0 && onNewPostClick) {
      onNewPostClick();
    }
  };
  return (
    <div
      key={post.id}
      className="post-item"
      onClick={handleClick}
      style={{ cursor: index === 0 ? "pointer" : "default" }}
    >
      {/*database images go here */}
      <div className="post-content-area">
        {index === 0 ? "" : <img src={post.image} alt="post art" />}
      </div>

      <div className="post-footer">
        {index === 0 ? "New Post +" : `${post.title}`}
      </div>
    </div>
  );
}
