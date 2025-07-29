// Lien du code pour l'animation  :
// https://github.com/homerchen19/react-water-wave


import React from 'react';
import WaterWave from 'react-water-wave';
import './WaterWaveEffect.css';



// Import de l'image
import ocean from "../../assets/ocean.jpg";

export default function WaterWaveEffect() {
  return (
    <WaterWave imageUrl={ocean} className="waterwave-wrapper">
      {() => (
        <div className="inside-waterwave">
        </div>
      )}
    </WaterWave>
  );
}
