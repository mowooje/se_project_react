import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import { coordinates, APIkey } from "../../utils/constants";

import Header from "../Header/Header";
import Main from "../Main/Main";
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
import { fetchUserData } from "../../utils/auth";

const currentDate = new Date().toLocaleDateString();

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(""); // ✅ Track which modal is open
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Corrected toggle switch function
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  // ✅ Fetch weather data
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  // ✅ Fetch clothing items
  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  // ✅ Check authentication token on mount
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

  // ✅ Handle registration and login
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

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header weatherData={weatherData} setActiveModal={setActiveModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Main clothingItems={clothingItems} weatherData={weatherData} />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleSignOut={handleSignOut}
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                />
              }
            />
          </Routes>
          <Footer />
          {/* <RegisterModal
            isOpen={activeModal === "register"}
            handleRegistration={handleRegister}
            isLoading={isLoading}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal}
          /> */}
          <RegisterModal
            isOpen={activeModal === "register"}
            handleRegistration={handleRegister}
            isLoading={isLoading}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            isLoading={isLoading}
            onClose={() => setActiveModal("")}
            setActiveModal={setActiveModal}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
