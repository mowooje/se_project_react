import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { editProfile } from "../../utils/api";

function EditProfileModal({ isOpen, onClose, token, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarUrlChange = (e) => setAvatarUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    if (!name.trim() || !avatarUrl.trim()) {
      console.error("Both name and avatar URL are required!");
      return;
    }
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
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit Profile"
      buttonText="Save"
      isLoading={isLoading}
    >
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
