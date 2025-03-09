import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarPlaceholder from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar({ onEditProfileClick, handleSignOutClick }) {
  const currentUser = useContext(CurrentUserContext);

  // Placeholder for the avatar (initial letter in a circle) if no avatar URL is provided
  const renderAvatar = currentUser?.avatar ? (
    <img
      className="sidebar__avatar"
      src={currentUser?.avatar}
      alt={`Avatar of ${currentUser?.name}`}
    />
  ) : (
    <div className="sidebar__avatar-placeholder">
      {currentUser?.name?.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <div className="sidebar">
      {renderAvatar}
      <p className="sidebar__username">{currentUser?.name}</p>
      <button
        className="sidebar__edit-profile-btn"
        onClick={onEditProfileClick}
      >
        Edit Profile
      </button>
      <button
        className="sidebar__signout-btn"
        onClick={handleSignOutClick}
        type="button"
      >
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
