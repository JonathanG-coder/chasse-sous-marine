import React from "react";
import "./Preventions.css";
import ScrollTriggered from "../../components/scrollTriggered/ScrollTriggered";

const Preventions = () => {
    return (
        <>
            <div className="prevention-title-wrapper">
                <h1 className="prevention-title">Prévention</h1>
            </div>
            <ScrollTriggered />
        </>
    );
};

export default Preventions;
