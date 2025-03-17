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
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>

      <img
        onClick={handleItemCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
