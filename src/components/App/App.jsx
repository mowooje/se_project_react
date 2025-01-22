import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { coordinates, APIkey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer.jsx";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import {
  addItems,
  deleteItem,
  getItems,
  registerUser,
  loginUser,
} from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import { fetchUserData } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleOpenDeleteModal = () => {
    setActiveModal("delete item");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (name, imageUrl, weather) => {
    const token = localStorage.getItem("jwt");
    addItems({ name, imageUrl, weather }, token)
      .then((data) => {
        setClothingItems((currentClothingItems) => [
          data,
          ...currentClothingItems,
        ]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard._id, token)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.error("Invalid token:", error);
          localStorage.removeItem("jwt"); // Remove invalid token
        });
    }
  }, []);

  const handleRegister = (values) => {
    setIsLoading(true);
    registerUser(values)
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .then(() => {
        return loginUser({ email: values.email, password: values.password });
      })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.error("Registration or login failed:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    loginUser(values)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res.user);
          closeActiveModal();
        } else {
          throw new Error("Authorization failed");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          onClose={closeActiveModal}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteItem={handleOpenDeleteModal}
        />
        <DeleteConfirmModal
          isOpen={activeModal === "delete item"}
          onClose={closeActiveModal}
          onConfirm={onDeleteItem}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          handleLogin={handleLogin}
          isLoading={isLoading}
          setActiveModal={setActiveModal}
          onClose={closeActiveModal}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          handleRegistration={handleRegister}
          isLoading={isLoading}
          setActiveModal={setActiveModal}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
