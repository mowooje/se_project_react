import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { addItems, deleteItem } from "../../utils/api";
import AddItemModal from "../../AddItemModal/AddItemModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (name, imageUrl, weather) => {
    addItems({ name, imageUrl, weather })
      .then((data) => {
        console.log(data);
        setClothingItems((currentClothingItems) => [
          data,
          ...currentClothingItems,
        ]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = () => {
    deleteItem(selectedCard._id)
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
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
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
          onConfirm={onDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
