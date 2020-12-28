import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import ReactLoading from "../SharedComponents/ReactLoading";

import ActionConfirmModal from "../SharedComponents/ActionConfirmModal";

import { BsTrashFill } from "react-icons/bs";
import { GoPackage } from "react-icons/go";

const ProfessorList = (props) => {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientId, setClientId] = useState(0);

  const ref = useRef(null);

  //   useEffect(() => {
  //     dispatch(getClients());
  //   }, []);

  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const handleDelete = () => {
    //dispatch(deleteClient(clientId));
    handleClose();
  };

  const handleClick = () => {
    ref.current.showClientOrders();
  };

  const data = [];
  const actions = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="table-actions">
        <GoPackage
          size="25px"
          color="#FFD700"
          onClick={() => {
            setClientId(row.id);
            handleClick();
          }}
        />{" "}
        <BsTrashFill
          size="1.3rem"
          color="red"
          onClick={() => {
            setClientId(row.id);
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
      dataField: "id",
      text: "N°",
      sort: true,
    },
    {
      dataField: "nom",
      text: "Nom et Prénom",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "raison_sociale",
      text: "CIN",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "addresse",
      text: "Date Embauche",
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
      dataField: "telephone",
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
      //dispatch(editClient(row.id, column.dataField, newValue));
    },
  });
  return (
    <>
      {true ? (
        <div className="table-responsive portlet">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
            columns={columns}
            cellEdit={cellEdit}
            filter={filterFactory()}
            defaultSorted={defaultSorted}
            noDataIndication="Pas d'enseignant"
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
        </div>
      ) : (
        <ReactLoading />
      )}
    </>
  );
};
export default ProfessorList;
