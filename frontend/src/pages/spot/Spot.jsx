import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import pinIcon from "../../assets/pin.png";
import "./Spot.css";

// Import des images
import erromardie from "../../assets/spotImg/erromardie.jpg";
import biarritz from "../../assets/spotImg/biarritz.jpg";
import digueDeAdour from "../../assets/spotImg/digue-de-adour.jpg";
import lesRochesNoires from "../../assets/spotImg/les-roches-noires.webp";
import rocherDuSousMarin from "../../assets/spotImg/rocher-du-sous-marin.avif";
import socoa from "../../assets/spotImg/socoa.jpg";
import sainteBarbe from "../../assets/spotImg/sainte-barbe.webp";
import cenitz from "../../assets/spotImg/cenitz.jpg";

// Icône personnalisée
const customIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [30, 35],
  iconAnchor: [15, 35],
  popupAnchor: [0, -35],
});

// Liste des spots de chasse sous-marine avec leurs infos
const spots = [
  {
    position: [43.4074, -1.6409],
    title: "Plage d’Erromardie - Saint jean de Luz",
    image: erromardie,
    description: "Plateau rocheux accessible depuis la plage, très bon spot pour les débutants.",
  },
  {
    position: [43.39624582124131, -1.682992973502502],
    title: "Socoa / Fort de Socoa  - Saint jean de Luz",
    image: socoa,
    description: "Zone protégée, idéale pour débutants.",
  },
  {
    position: [43.399673692625065, -1.6649595546067617],
    title: "Pointe Sainte-Barbe  - Saint jean de Luz",
    image: sainteBarbe,
    description: "Zone rocheuse accessible à la palme.",
  },
  {
    position: [43.42195894265778, -1.6204711868039867],
    title: "Plage de Cenitz  - Guéthary",
    image: cenitz,
    description: "Excellent plateau rocheux.",
  },
  {
    position: [43.48471991023966, -1.5705483996670981], 
    title: "Rocher de la vierge – Biarritz",
    image: biarritz,
    description: "Spot emblématique aux fonds variés, idéal pour la chasse et l’exploration.",
  },
  {
    position: [43.3827, -1.7681],
    title: "Les Roches Noires – Hendaye",
    image: lesRochesNoires,
    description: "Zone rocheuse très poissonneuse, parfaite pour les chasseurs expérimentés.",
  },
  {
    position: [43.3791, -1.7689],
    title: "Rocher du Sous-Marin – Hendaye",
    image: rocherDuSousMarin,
    description: "Rocher emblématique avec un fond riche en vie marine, chasse accessible à marée basse.",
  },
  {
    position: [43.53228544409896, -1.5330919170579198],
    title: "Digue de l’Adour – Anglet",
    image: digueDeAdour,
    description: "Spot à fort courant, mais très productif. À réserver aux chasseurs expérimentés.",
  },
];

const Spot = () => {
  return (
    <div className="map-container">
      <MapContainer
        center={[43.42, -1.65]}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Partie bas-droite avec attribution = ne pas supprimer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marqueurs dynamiques pour appeler les différents spots.  */}
        {spots.map((spot, index) => (
          <Marker key={index} position={spot.position} icon={customIcon}>
            <Popup>
              <figure>
                <img src={spot.image} alt={spot.title} width="100%" />
                <figcaption>{spot.title}</figcaption>
              </figure>
              <p>{spot.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Spot;
