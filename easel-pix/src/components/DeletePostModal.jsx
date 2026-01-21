import { useState } from "react";
import axios from "axios";
import "./DeletePostModal.css";

export default function DeletePostModal({
  isOpen,
  onClose,
  post,
  onPostDeleted,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to delete posts");
        setLoading(false);
        return;
      }
      await axios.delete(`/api/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Post deleted");

      if (onPostDeleted) {
        onPostDeleted();
      }

      onClose();
    } catch (err) {
      console.error("error deleting post:", err);
      setError(err.response?.data?.error || "failed to delete post");
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modalBackdrop" onClick={handleBackdropClick}>
      <div className="deleteModalContent">
        <div className="modalHeader">
          <h2>Delete post</h2>
          <button className="closeButton" onClick={onClose} type="button">
            x
          </button>
        </div>

        {error && <div className="errorMessage">{error}</div>}

        <div className="formActions">
          <button
            type="button"
            onClick={onClose}
            className="cancelButton"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="deleteConfirmButton"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
