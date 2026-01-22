import { useState, useEffect } from "react";
import axios from "axios";
import "./EditPostModal.css";

export default function EditPostModal({
  isOpen,
  onClose,
  post,
  onPostUpdated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (post && isOpen) {
      setFormData({
        title: post.title || "",
        description: post.description || "",
        image: post.image || "",
      });
      setImagePreview(post.image || null);
    }
  }, [post, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    const maxSizeKB = 70;
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      const fileSizeKB = Math.round(file.size / 1024);
      setError(
        `Image is too large (${fileSizeKB}KB), maximum size is ${maxSizeKB}`,
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData((prev) => ({
        ...prev,
        image: base64String,
      }));
      setImagePreview(base64String);
      setError("");
    };
    reader.onerror = () => {
      setError("Failed to read Image File");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to edit posts");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `/api/posts/${post.id}`,
        {
          title: formData.title,
          description: formData.description,
          image: formData.image || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Post updated", response.data);
      try {
        const response = await axios.get(`/api/posts/${post.id}`);
        onPostUpdated(response.data);
      } catch (err) {
        console.error("Error fetching post", err);
        setError(err.response?.data?.error || "Failed to load post");
        setLoading(false);
      }

      // if (onPostUpdated) {
      //   onPostUpdated(response.data);
      // }

      onClose();
    } catch (err) {
      console.error("Error uopdating post:", err);
      setError(err.response?.data?.error || "Failed to update post");
    } finally {
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
      <div className="modalContent">
        <div className="modalHeader">
          <h2>Edit Post</h2>
          <button className="closeButton" onClick={onClose} type="button">
            x
          </button>
        </div>

        {error && <div className="errorMessage">{error}</div>}

        <form onSubmit={handleSubmit} className="editPostForm">
          <div className="formGroup">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
              maxLength={100}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter post description"
              rows={5}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="imageFile">Update Image (optional)</label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
            />
            {imagePreview && (
              <div className="imagePreviewContainer">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="imagePreview"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="removeImageButton"
                  disabled={loading}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="formActions">
            <button
              type="button"
              onClick={onClose}
              className="cancelButton"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="submitButton" disabled={loading}>
              {loading ? "Updating..." : "Update post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
