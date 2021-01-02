import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import ReactLoading from "../SharedComponents/ReactLoading";

import ActionConfirmModal from "../SharedComponents/ActionConfirmModal";

import { FiTrash2, FiEye } from "react-icons/fi";
import {
  getStaff,
  deleteStaff,
  editStaff,
} from "../../store/actions/staff.actions";
import PersonDetails from "../SharedComponents/PersonDetails";

const StaffList = (props) => {
  const dispatch = useDispatch();

  //staff object to pass to PersonDetails
  const [staff, setStaff] = useState(0);

  const ref = useRef(null);
  //Staff Details
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const handleDetailsClose = () => setShowDetailsModal(false);
  const handleDetailsShow = () => setShowDetailsModal(true);

  //confirm Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  //delete staff
  const handleDelete = () => {
    dispatch(
      deleteStaff(
        staff.cin,
        staff._links.self.href.charAt(staff._links.self.href.length - 1)
      )
    );
    handleClose();
  };

  //Students list and table management
  const staffData = useSelector((state) => state.staff.staff);
  const isLoaded = useSelector((state) => state.staff.isLoaded);
  useEffect(() => {
    dispatch(getStaff());
  }, []);

  const actions = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <FiEye
          size="25px"
          color="green"
          onClick={() => {
            setStaff(row);
            handleDetailsShow();
          }}
        />
        <FiTrash2
          size="25px"
          color="red"
          onClick={() => {
            setStaff(row);
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
      dataField: "role",
      text: "Rôle",
      sort: true,
      filter: textFilter(),
    },

    {
      dataField: "birthdate",
      text: "D. Naissance",
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
        editStaff(
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
            data={staffData}
            columns={columns}
            cellEdit={cellEdit}
            filter={filterFactory()}
            defaultSorted={defaultSorted}
            noDataIndication="Pas de membre"
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
            <PersonDetails
              show={showDetailsModal}
              handleClose={handleDetailsClose}
              object={staff}
              flag="STAFF"
            />
          ) : null}
        </div>
      ) : (
        <ReactLoading />
      )}
    </>
  );
};
export default StaffList;
