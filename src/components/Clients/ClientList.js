import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteClient,
    getClients,
    editClient
} from "../../store/actions/clients.action";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import ReactLoading from "../SharedComponents/ReactLoading";

import ActionConfirmModal from "../SharedComponents/ActionConfirmModal";
import ClientOrders from "./ClientOrders";

import { BsTrashFill } from "react-icons/bs";
import { GoPackage } from "react-icons/go";

const ClientList = props => {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients.clients);
    const total = useSelector(state => state.clients.total);
    const isLoaded = useSelector(state => state.clients.isLoaded);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clientId, setClientId] = useState(0);

    const ref = useRef(null);

    useEffect(() => {
        dispatch(getClients());
    }, []);

    const handleClose = () => setShowDeleteModal(false);
    const handleShow = () => setShowDeleteModal(true);

    const handleDelete = () => {
        dispatch(deleteClient(clientId));
        handleClose();
    };

    const handleClick = () => {
        ref.current.showClientOrders();
    };
    useEffect(() => {
        props.getCounts(total);
    }, [clients]);
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
            order: "desc"
        }
    ];

    const columns = [
        {
            dataField: "id",
            text: "N°",
            sort: true
        },
        {
            dataField: "nom",
            text: "Nom Contact",
            sort: true,
            filter: textFilter()
        },
        {
            dataField: "raison_sociale",
            text: "Société",
            sort: true,
            filter: textFilter()
        },

        {
            dataField: "matricule_fiscal",
            text: "Matricule Fiscal",
            sort: true,
            filter: textFilter()
        },
        {
            dataField: "addresse",
            text: "Addresse",
            sort: true,
            filter: textFilter()
        },

        {
            dataField: "email",
            text: "Email",
            sort: true,
            filter: textFilter()
        },
        {
            dataField: "telephone",
            text: "Tél.",
            filter: textFilter()
        },
        {
            dataField: "actions",
            text: "Actions",
            formatter: actions
        }
    ];

    const cellEdit = cellEditFactory({
        mode: "dbclick",
        afterSaveCell: (oldValue, newValue, row, column) => {
            dispatch(editClient(row.id, column.dataField, newValue));
        }
    });
    return (
        <>
            {isLoaded ? (
                <div className="table-responsive portlet">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={clients}
                        columns={columns}
                        cellEdit={cellEdit}
                        filter={filterFactory()}
                        defaultSorted={defaultSorted}
                        noDataIndication="Pas de Clients"
                        pagination={paginationFactory()}
                        striped
                        bordered={false}
                        wrapperClasses="table-responsive"
                    />
                    <ClientOrders ref={ref} clientId={clientId} />
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
export default ClientList;
