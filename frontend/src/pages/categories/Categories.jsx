import React from "react";
import RollingGallery from "../../components/rollingGallery/RollingGallery";
import "./Categories.css";

const Categories = () => {
  return (
    <>
      <div className="especeTitleWrapper">
        <h1 className="especeTitle">Faune et flore marine côtière du 64</h1>
      </div>
      <RollingGallery autoplay={true} pauseOnHover={true} />
    </>
  );
};

export default Categories;
