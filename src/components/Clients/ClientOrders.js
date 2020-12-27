import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
    textFilter,
    selectFilter
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Badge } from "react-bootstrap";

import ReactLoading from "../SharedComponents/ReactLoading";

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table
} from "reactstrap";
import { FaEye } from "react-icons/fa";
import { BASE_URL } from "../../store/store";

const ClientOrders = forwardRef(({ clientId }, ref) => {
    const [value, setValue] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orders, setOrders] = useState([]);

    const showModal = () => {
        setValue(true);
    };

    const hideModal = () => {
        setValue(false);
    };

    useImperativeHandle(ref, () => {
        return {
            showClientOrders: showModal
        };
    });

    const getOrdersByClient = id => {
        if (id) {
            axios
                .get(BASE_URL + `/commandes/client/${id}`)
                .then(res => {
                    setOrders(res.data);
                    setIsLoaded(true);
                })
                .catch(error => {
                    toast.warn(
                        "Impossible de charger les commandes. Réessayer. "
                    );
                });
        }
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
            case "terminée": {
                return (
                    <div>
                        <Badge pill variant="secondary">
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
                        </Badge>{" "}
                        <br />
                        {row.delivered < 0 ? null : row.delivered == 0 ? (
                            <Badge pill variant="warning">
                                en livraison
                            </Badge>
                        ) : (
                            <Badge pill variant="success">
                                livrée
                            </Badge>
                        )}{" "}
                        {row.payed < 0 ? null : row.payed == 0 ? (
                            <Badge pill variant="warning">
                                impayée
                            </Badge>
                        ) : (
                            <Badge pill variant="success">
                                payée
                            </Badge>
                        )}
                    </div>
                );
            }
        }
    };

    const actions = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div className="table-actions">
                <Link
                    to={{
                        pathname: "/commandes",
                        state: { id: row.id }
                    }}
                >
                    <FaEye size="25px" color="green" />
                </Link>
            </div>
        );
    };
    const selectOptions = {
        enregistrée: "enregistrée",
        "en traitement": "en traitement",
        annulée: "annulée",
        terminée: "terminée"
    };

    const columns = [
        {
            dataField: "id",
            text: "N° Commande"
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

    useEffect(() => {
        getOrdersByClient(clientId);
        return function cleanUp() {
            setIsLoaded(false);
            setOrders([]);
        };
    }, [clientId]);
    return (
        <>
            <Modal
                isOpen={value}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                autoFocus={true}
            >
                <ModalHeader toggle={hideModal}>
                    {orders.length} Commande(s) en total
                </ModalHeader>

                <ModalBody>
                    {isLoaded ? (
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={orders}
                            columns={columns}
                            filter={filterFactory()}
                            noDataIndication="Pas de Commandes"
                            striped
                            bordered={false}
                        />
                    ) : (
                        <ReactLoading />
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger" onClick={hideModal}>
                        Fermer
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});
export default ClientOrders;
