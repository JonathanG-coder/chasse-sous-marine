import React from "react";
import { useLocation } from "react-router-dom";
import "./Especes.css";
import CircularGallery from "../../components/circularGallery/CircularGallery";

const Especes = () => {
  const location = useLocation();
  const category = location.state?.category || "Catégorie non définie";

  return (
    <>
      <div className="especeContainer">
        <h1 className="especeTitle">🪸 Faune et flore marine côtière du 64</h1>
        <p className="categoryInfo">Catégorie sélectionnée : <strong>{category}</strong></p>
      </div>
      {/* On passe la catégorie en prop à CircularGallery */}
      <CircularGallery category={category} />
    </>
  );
};

export default Especes;
