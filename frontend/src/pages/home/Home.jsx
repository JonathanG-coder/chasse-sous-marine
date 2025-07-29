import React from "react";
import "./Home.css";

//Import de WaterWaveEffect pour animé l'ondulation durant le bougement de la souris
import WaterWaveEffect from "../../components/waterWaveEffect/WaterWaveEffect";

//Import de WavyTitle pour faire bouger le titre
import WavyTitle from "../../components/header/wavyTitle/WavyTitle";

// Import des elements pour le DarkMode
import { useTheme } from "../../context/themeContext";
// Import des images en clair et sombre
import iconLightHouseB from "../../assets/iconDarkMode/lighthouse-b.png";
import iconLightHouseW from "../../assets/iconDarkMode/lighthouse-w.png";


// Variable pour appeler les images.
const lightIconW = iconLightHouseW;
const lightIconB = iconLightHouseB;

export default function Home() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <div className="home-container">
        <WaterWaveEffect />

        <div className="titleBanniere">
          <div className="title-row">
            <button onClick={toggleDarkMode} className="light-toggle-btn">
              <img
                src={darkMode ? lightIconB : lightIconW}
                alt="lightHouse"
                className="iconLightHouse large"
              />
            </button>
            <WavyTitle />
          </div>
          <p className="slogan">Explorez les profondeurs en toute liberté</p>
        </div>
      </div>
    </>
  );
}
