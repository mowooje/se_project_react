import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";

function Main({ weatherData = {}, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[currentTemperatureUnit] || 999;

  return (
    <BrowserRouter>
      <main>
        <WeatherCard weatherData={weatherData} />
        <section className="cards">
          <p className="cards__text">
            Today is {temp} {currentTemperatureUnit} / You may want to wear:
          </p>
          <ul className="cards__list">
            {defaultClothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                  />
                );
              })}
          </ul>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default Main;
