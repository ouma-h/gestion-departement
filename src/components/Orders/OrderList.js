import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteOrder, getOrders } from "../../store/actions/orders.actions";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
    textFilter,
    selectFilter
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import ReactLoading from "../SharedComponents/ReactLoading";
import { Badge } from "react-bootstrap";

import DetailsOrder from "./DetailsOrder";
import ActionConfirmModal from "../SharedComponents/ActionConfirmModal";
import { useLocation } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

const OrderList = () => {
    let location = useLocation();

    const dispatch = useDispatch();

    const [client, setClient] = useState({});
    const [order, setOrder] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const refDetails = useRef(null);

    const orders = useSelector(state => state.orders.orders);
    const isLoaded = useSelector(state => state.orders.isLoaded);

    const handleClose = () => setShowDeleteModal(false);
    const handleShow = () => setShowDeleteModal(true);

    const handleClick = ref => {
        ref.current.showModal();
    };

    useEffect(() => {
        dispatch(getOrders());
        return function cleanUp() {
            location = {};
        };
    }, []);

    const handleDelete = () => {
        dispatch(deleteOrder(order.id));
        handleClose();
    };
    const status = (cell, row, rowIndex, formatExtraData) => {
        switch (row.etat) {
            case "enregistrée": {
                return (
                    <div>
                        <Badge pill variant="primary">
                            {row.etat}
                        </Badge>
                    </div>
                );
            }
            case "annulée": {
                return (
                    <div>
                        <Badge pill variant="danger">
                            {row.etat}
                        </Badge>
                    </div>
                );
            }
            case "en traitement": {
                return (
                    <div>
                        <Badge pill variant="info">
                            {row.etat}
                        </Badge>
                    </div>
                );
            }
            case "terminée": {
                return (
                    <div>
                        <Badge pill variant="secondary">
                            {row.etat}
                        </Badge>
                    </div>
                );
            }
            case "devis": {
                return (
                    <div>
                        <Badge pill variant="warning">
                            {row.etat}
                        </Badge>
                    </div>
                );
            }
            case "caisse": {
                return (
                    <div>
                        <Badge pill variant="success">
                            {row.etat}
                        </Badge>
                    </div>
                );
            }
        }
    };

    const actions = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="table-actions">
                <FaEye
                    size="25px"
                    color="green"
                    onClick={() => {
                        setClient(row.client);
                        handleClick(refDetails);
                        setOrder(row);
                    }}
                />

                {row.etat == "enregistrée" ? (
                    <>
                        <BsTrashFill
                            size="25px"
                            color="red"
                            onClick={() => {
                                setOrder(row);
                                handleShow();
                            }}
                        />
                    </>
                ) : null}
            </div>
        );
    };
    const selectOptions = {
        caisse: "caisse",
        devis: "devis",
        enregistrée: "enregistrée",
        "en traitement": "en traitement",
        terminée: "terminée",
        annulée: "annulée"
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
            text: "N° Commande",
            filter: textFilter({
                defaultValue: location.state ? location.state.id : ""
            })
        },
        {
            dataField: "client.nom",
            text: "Client",
            sort: true,
            filter: textFilter(),
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                    <div>
                        {row.etat == "caisse" || row.etat == "devis"
                            ? row.beneficiary
                            : row.client.nom}
                    </div>
                );
            }
        },
        {
            dataField: "created_at",
            text: "Date Commande",
            sort: true,
            filter: textFilter()
        },
        {
            dataField: "etat",
            text: "Etat",
            sort: true,
            filter: selectFilter({
                options: selectOptions
            }),
            formatter: status
        },

        {
            dataField: "actions",
            text: "Actions",
            formatter: actions
        }
    ];

    return (
        <>
            {isLoaded ? (
                <div className="table-responsive portlet">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={orders}
                        columns={columns}
                        filter={filterFactory()}
                        noDataIndication="Pas de Commandes"
                        pagination={paginationFactory()}
                        striped
                        bordered={false}
                        wrapperClasses="table-responsive"
                        defaultSorted={defaultSorted}
                    />

                    <DetailsOrder
                        ref={refDetails}
                        client={client}
                        dispatch={dispatch}
                        order={order}
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

export default OrderList;
