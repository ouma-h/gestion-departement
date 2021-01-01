import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import ReactLoading from "../SharedComponents/ReactLoading";
import StudentDetails from "./StudentDetails";
import ActionConfirmModal from "../SharedComponents/ActionConfirmModal";

import { FiTrash2, FiEye } from "react-icons/fi";

import {
  deleteStudent,
  editStudent,
  getStudents,
} from "../../store/actions/students.actions";

const StudentList = (props) => {
  const dispatch = useDispatch();

  //Edit Student
  const [student, setStudent] = useState(0);

  //confirm Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  //delete student
  const handleDelete = () => {
    dispatch(
      deleteStudent(
        student.cin,
        student._links.self.href.charAt(student._links.self.href.length - 1)
      )
    );
    handleClose();
  };

  //Student Details
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const handleDetailsClose = () => setShowDetailsModal(false);
  const handleDetailsShow = () => setShowDetailsModal(true);

  //Students list and table management
  const students = useSelector((state) => state.students.students);
  const isLoaded = useSelector((state) => state.students.isLoaded);
  useEffect(() => {
    dispatch(getStudents());
  }, []);

  const actions = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <FiEye
          size="25px"
          color="green"
          onClick={() => {
            setStudent(row);
            handleDetailsShow();
          }}
        />
        <FiTrash2
          size="25px"
          color="red"
          onClick={() => {
            setStudent(row);
            handleShow();
          }}
        />
      </div>
    );
  };

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const columns = [
    {
      dataField: "cin",
      text: "CIN",
      sort: true,
    },
    {
      dataField: "name",
      text: "Nom et Prénom",
      sort: true,
      filter: textFilter(),
    },

    {
      dataField: "grade",
      text: "Niveau",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "major",
      text: "Spécialité",
      sort: true,
      filter: textFilter(),
    },

    {
      dataField: "email",
      text: "Email",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "phone",
      text: "Tél.",
      filter: textFilter(),
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: actions,
    },
  ];

  const cellEdit = cellEditFactory({
    mode: "dbclick",
    afterSaveCell: (oldValue, newValue, row, column) => {
      row[column.dataField] = newValue;
      dispatch(
        editStudent(
          row,
          row._links.self.href.charAt(row._links.self.href.length - 1)
        )
      );
    },
  });
  return (
    <>
      {isLoaded ? (
        <div className="table-responsive portlet">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={students}
            columns={columns}
            cellEdit={cellEdit}
            filter={filterFactory()}
            defaultSorted={defaultSorted}
            noDataIndication="Pas d'étudiant"
            striped
            bordered={false}
            wrapperClasses="table-responsive"
          />

          {showDeleteModal ? (
            <ActionConfirmModal
              show={showDeleteModal}
              handleClose={handleClose}
              action={handleDelete}
            />
          ) : null}
          {showDetailsModal ? (
            <StudentDetails
              show={showDetailsModal}
              handleClose={handleDetailsClose}
              student={student}
            />
          ) : null}
        </div>
      ) : (
        <ReactLoading />
      )}
    </>
  );
};
export default StudentList;
