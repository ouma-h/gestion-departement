import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Badge } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { FiCalendar, FiMail, FiPhone, FiCreditCard } from "react-icons/fi";
import ReactLoading from "../SharedComponents/ReactLoading";
const color = "#b3243c";
const StudentDetails = ({ show, handleClose, student }) => {
  return (
    <>
      <Modal
        isOpen={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={handleClose}>Détails Etudiant</ModalHeader>
        <ModalBody>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {student.name}
                </div>

                <div
                  style={{ marginTop: "8px" }}
                  className="h5 mb-0 font-weight-bold text-gray-600"
                >
                  {student.grade} {student.major}
                </div>
                <br />
                <hr />
                <br />
                <div>
                  {student.cin ? (
                    <div>
                      <FiCreditCard color={color} /> {student.cin}
                    </div>
                  ) : null}{" "}
                </div>
                <div>
                  {student.birthdate ? (
                    <div>
                      <FiCalendar color={color} /> {student.birthdate}
                    </div>
                  ) : null}{" "}
                </div>

                <div>
                  {student.email ? (
                    <div>
                      <FiMail color={color} /> {student.email}
                    </div>
                  ) : null}
                </div>

                <div>
                  {student.phone ? (
                    <div>
                      {" "}
                      <FiPhone color={color} /> {student.phone}
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
export default StudentDetails;
