import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Badge } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { FiCalendar, FiMail, FiPhone, FiCreditCard } from "react-icons/fi";
import ReactLoading from "../SharedComponents/ReactLoading";
const color = "#b3243c";
const PersonDetails = ({ show, handleClose, object, flag }) => {
  return (
    <>
      <Modal
        isOpen={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={handleClose}>
          Détails{" "}
          {flag === "STAFF"
            ? "membre admin"
            : flag === "STUDENT"
            ? "Etudiant"
            : "Enseignant"}
        </ModalHeader>
        <ModalBody>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {object.name}
                </div>

                <div
                  style={{ marginTop: "8px" }}
                  className="h5 mb-0 font-weight-bold text-gray-600"
                >
                  {flag === "STAFF"
                    ? object.role
                    : flag === "STUDENT"
                    ? object.grade + " " + object.major
                    : object.specialty}
                </div>
                <br />
                <hr />
                <br />
                <div>
                  {object.cin ? (
                    <div>
                      <FiCreditCard color={color} /> {object.cin}
                    </div>
                  ) : null}{" "}
                </div>
                <div>
                  {object.birthdate ? (
                    <div>
                      <FiCalendar color={color} /> {object.birthdate}
                    </div>
                  ) : null}{" "}
                </div>

                <div>
                  {object.email ? (
                    <div>
                      <FiMail color={color} /> {object.email}
                    </div>
                  ) : null}
                </div>

                <div>
                  {object.phone ? (
                    <div>
                      {" "}
                      <FiPhone color={color} /> {object.phone}
                    </div>
                  ) : null}
                </div>
                <div></div>
              </div>
              <div className="col-auto">
                <BsFillPersonFill size="10rem" color={color} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-danger"
            onClick={() => {
              handleClose();
            }}
          >
            Fermer
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default PersonDetails;
