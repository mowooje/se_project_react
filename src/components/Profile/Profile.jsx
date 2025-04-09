import React, { useState, useContext, useEffect } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardLike,
  token,
  handleSignOut,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [items, setItems] = useState(clothingItems);

  useEffect(() => {
    setItems(clothingItems); // Ensure state updates on new items
  }, [clothingItems]);

  const handleEditProfileClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={handleEditProfileClick}
          handleSignOutClick={handleSignOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        token={token}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}

export default Profile;
