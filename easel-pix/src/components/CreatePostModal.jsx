import { useState } from "react";
import axios from "axios";
import "./createPostModal.css";

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  //TODO: Causing a freeze in the browser
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

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // Validate file size (max 70KB to account for base64 encoding overhead)
    const maxSizeKB = 70;
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      const fileSizeKB = Math.round(file.size / 1024);
      setError(
        `Image is too large (${fileSizeKB}KB). Maximum size is ${maxSizeKB}KB (images are encoded as base64, which adds ~33% overhead to fit the 100KB server limit).`
      );
      return;
    }

    // Convert to base64
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
      setError("Failed to read image file");
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
        setError("You must be logged in to create a post");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "/api/posts",
        {
          title: formData.title,
          description: formData.description,
          image: formData.image || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created:", response.data);

      // Reset form
      setFormData({
        title: "",
        description: "",
        image: "",
      });
      setImagePreview(null);

      // Notify parent component
      if (onPostCreated) {
        onPostCreated(response.data);
      }

      // Close modal
      onClose();
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.response?.data?.error || "Failed to create post");
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
          <h2>Create New Post</h2>
          <button className="closeButton" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        {error && <div className="errorMessage">{error}</div>}

        <form onSubmit={handleSubmit} className="createPostForm">
          <div className="formGroup">
            <label htmlFor="title">Title *</label>
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
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe your post"
              rows={5}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="imageFile">Upload Image (optional, max 70KB)</label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              required
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
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
