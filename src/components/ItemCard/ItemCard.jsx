import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleItemCardClick = () => {
    if (typeof onCardClick === "function") {
      // ✅ Prevent errors if undefined
      onCardClick(item);
    } else {
      console.error("onCardClick is not a function");
    }
  };

  const handleLikeClick = () => {
    if (currentUser && typeof handleCardLike === "function") {
      handleCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleItemCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

      {currentUser && (
        <button className={itemLikeButtonClassName} onClick={handleLikeClick}>
          {isLiked ? "Unlike" : "Like"}
        </button>
      )}
    </li>
  );
}

export default ItemCard;
