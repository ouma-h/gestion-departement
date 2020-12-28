import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import { BsFillPlusSquareFill } from "react-icons/bs";

import ProfessorList from "./ProfessorList";
import ProfessorForm from "./ProfessorForm";

const Professors = () => {
  const [showForm, setShowForm] = useState(false);
  const myRef = useRef(null);

  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Enseignants</h1>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div
              className="card-header py-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h6 className="m-0 font-weight-bold text-green">
                Liste des Enseignants
              </h6>
              <div className="header-buttons">
                <BsFillPlusSquareFill
                  color="#243495"
                  size="2rem"
                  onClick={() => {
                    setShowForm(!showForm);
                    setTimeout(() => {
                      myRef.current.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }, 100);
                  }}
                />
              </div>
            </div>
            <div className="card-body">
              <ProfessorList />
            </div>
            {showForm ? (
              <div className="card-body product-form" ref={myRef}>
                <ProfessorForm show={setShowForm} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Professors;
