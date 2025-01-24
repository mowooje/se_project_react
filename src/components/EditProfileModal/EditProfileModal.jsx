import React, { useState, useContext } from "react";
import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { editProfile } from "../../utils/api";

function EditProfileModal({ isOpen, onClose, token, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editProfile({ name, avatarUrl }, token)
      .then((updatedUser) => {
        onUpdateUser(updatedUser);
        onClose();
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal__title">Edit Profile</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name:
            <input
              type="text"
              className="modal__input"
              value={name}
              onChange={handleNameChange}
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL:
            <input
              type="url"
              className="modal__input"
              value={avatarUrl}
              onChange={handleAvatarUrlChange}
              required
            />
          </label>
          <button type="submit" className="modal__submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
