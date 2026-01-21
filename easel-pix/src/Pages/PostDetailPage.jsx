import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import EditPostModal from "../components/EditPostModal";
import DeletePostModal from "../components/DeletePostModal";
import "./PostDetailPage.css";

export default function PostDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post", err);
        setError(err.response?.data?.error || "Failed to load post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handlePostUpdated = (updatePost) => {
    setPost(updatePost);
    setShowEditModal(false);
  };

  const handlePostDeleted = () => {
    navigate("/user");
  };

  if (loading) {
    return <div className="PostDetailContainer">Loading...</div>;
  }
  if (error) {
    return <div className="postDetailContainer">Error: {error}</div>;
  }
  if (!post) {
    return <div className="postDetailContainer">Post not found</div>;
  }

  const isOwner = user && user.id === post.user_id;

  return (
    <div className="postDetailContainer">
      <div className="postDetailCard">
        <div className="postDetailHeader">
          <div className="authorInfo">
            {post.profilepicture && (
              <img
                src={post.profilepicture}
                alt={post.displayname}
                className="authorAvatar"
              />
            )}
            <div>
              <h3>{post.displayname}</h3>
              <p className="username">-{post.username}</p>
            </div>
          </div>
          {isOwner && (
            <div className="postActions">
              <button
                onClick={() => setShowEditModal(true)}
                className="editButton"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="deleteButton"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {post.image && (
          <div className="postImageContainer">
            <img src={post.image} alt={post.title} className="postImage" />
          </div>
        )}
        <div className="postContent">
          <h1>{post.title}</h1>
          <p className="description">{post.description}</p>
        </div>

        <button onClick={() => navigate(-1)} className="backButton">
          Back
        </button>
      </div>

      {isOwner && (
        <div>
          <EditPostModal
            isOpen={showEditModal}
            onClose={() => showEditModal(false)}
            post={post}
            onPostUpdated={handlePostUpdated}
          />
          <DeletePostModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            post={post}
            onPostDeleted={handlePostDeleted}
          />
        </div>
      )}
    </div>
  );
}
