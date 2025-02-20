import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "F"} // ✅ Properly controls the checkbox
      />
      <span
        className={`switch__slider ${
          currentTemperatureUnit === "F"
            ? "switch__slider-F"
            : "switch__slider-C"
        }`}
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" ? "switch__active" : ""
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" ? "switch__active" : ""
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
