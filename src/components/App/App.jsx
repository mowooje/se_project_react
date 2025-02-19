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
import CurrentUserContext from "../../contexts/CurrentUserContext";
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

const currentDate = new Date().toLocaleDateString();

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(""); // ✅ Track which modal is open
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = (values) => {
    setIsLoading(true);
    registerUser(values)
      .then(() => loginUser({ email: values.email, password: values.password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return fetchUserData(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setActiveModal(""); // ✅ Close modal after login
      })
      .catch((error) => console.error("Registration or login failed:", error))
      .finally(() => setIsLoading(false));
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    loginUser(values)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return fetchUserData(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setActiveModal(""); // ✅ Close modal after login
      })
      .catch((error) => console.error("Login failed:", error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Invalid token:", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit }}
      >
        <div className="page">
          <Header
            weatherData={weatherData}
            setActiveModal={setActiveModal} // ✅ Passes setActiveModal to Header
          />
          <Routes>
            <Route path="/" element={<Main clothingItems={clothingItems} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
          <RegisterModal
            isOpen={activeModal === "register"}
            handleRegistration={handleRegister}
            isLoading={isLoading}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal} // ✅ Ensure modals can toggle
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            isLoading={isLoading}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal} // ✅ Ensure modals can toggle
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
