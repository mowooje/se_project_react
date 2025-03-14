import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, setActiveModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext);

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser?.avatar}
          alt={`${currentUser?.name}'s avatar`}
          className="header__avatar"
        />
      );
    }

    // Placeholder with the user's first letter
    const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";
    return <div className="header__avatar-placeholder">{userInitial}</div>;
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Header Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData?.city || "Unknown City"}
      </p>
      <div className="toggle__switch">
        <ToggleSwitch />
      </div>

      {currentUser ? (
        <>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {renderAvatar()}
            </div>
          </Link>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            onClick={() => setActiveModal("register")} // ✅ Directly calls setActiveModal
            className="header__signup"
            type="button"
          >
            Sign up
          </button>
          <button
            onClick={() => setActiveModal("login")} // ✅ Directly calls setActiveModal
            className="header__login"
            type="button"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
