import "./Thumbnail.css";

export default function PostThumbnail({
  post,
  index,
  onNewPostClick,
  onPostClick,
}) {
  const handleClick = () => {
    if (index === 0 && onNewPostClick) {
      onNewPostClick();
    } else if (index !== 0 && onPostClick) {
      onPostClick(post.id);
    }
  };

  return (
    <div
      key={post.id}
      className="post-item"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
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
