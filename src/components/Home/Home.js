import React, { useEffect, useState } from "react";
import { RiBillLine } from "react-icons/ri";
import { GoPackage } from "react-icons/go";
import { FaCashRegister } from "react-icons/fa";

import { Button, ButtonGroup, Spinner } from "reactstrap";

const Home = () => {
  return (
    <div style={{ margin: "10px" }}>
      <h1>Dashboard de reporting</h1>
      {/* <div>
        
        <div
          className="flex-wrap "
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <h1 className="h3 mb-2 text-gray-800 animate__animated animate__fadeInLeft">
            Chiffre d'affaires (HT)
          </h1>
        </div>
      </div>
      <div className="divider" />

      
      <div>
        <div
          className="flex-wrap animate__animated animate__fadeInLeft"
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <h1 className="h3 mb-2 text-gray-800">Section Etudiant</h1>
          <span style={{ marginLeft: "5px" }}>Ventes effectuées</span>
        </div>
        <div className="ventes_section"></div>
      </div> */}
      <div className="divider" />
    </div>
  );
};

export default Home;
